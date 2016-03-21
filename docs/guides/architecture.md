# Architecture

The application uses [react](https://facebook.github.io/react/),
[react-router](http://rackt.github.io/react-router/tags/v1.0.0-beta3.html),
[redux](https://github.com/gaearon/redux) and [express](http://expressjs.com/)
as the core of the application. Application is bootstrapped using babel to
enable ES6+ functions.


## Directory Structure
```
app
├── client.js                client bundle
├── components
│   └── ...                  all reusable components
├── config.json              config file
├── lib
│   └── ...                  reusable utilities
├── redux
│   ├── actions
│   │   └── ...              redux actions
│   ├── constants
│   │   └── ....             redux action types
│   ├── helpers.js           helpers to create reducers, actions
│   ├── initStore.js         utility to bootstrap the store
│   ├── middleware
│   │   └── ...              store middleware
│   └── reducers
│       ├── ...
│       └── index.js         all reducers should be listed in the index
├── router.js                code that bootstraps the router in client/server
├── routes.js                defines all application routes
├── server.js                express server code
├── templates
│   └── index.html           main template used by the app
└── views
    └── ...                  interactive react views
```

## Interactive components

Components should be able to be rendered both in the client and in the server.
To ensure all data is loaded correctly, components that need initial data should
user the connectData decorator. Even though `componentWillMount` is
called when passing it in `renderToString`, we can't ensure that all the data
required by the component will be there by the time the component is rendered
in the server. the function passed to collectData is called and resolved by 
the time the component is mounted.

Example:

```javascript
import React from 'react';
import * as myAction from 'redux/actions/myActions';
import connectData from 'lib/connectData';
import { connect } from 'react-redux';

// requestData :: getState, dispatch, location, params -> Function
function requestData(getState, dispatch, location, params) {
  // you can return a promise
  const currentState = getState();
  if (!currentState.info.isReady) {
    // only dispatch action if the info has not been loaded
    return dispatch(myActions.loadInfo());
   }
}

@connectData(requestData)
@connect(state => ({
  foo: state.baz.foo,
  bar: state.baz.bar
}))
class MyComponent extends React.Component {

  render() {
    const {foo, bar} = this.props;
    return (<p> {foo} - {bar}</p>);
  }
}
```


### Pitfalls

- Be careful with what you put in `componentWillMount`, the function will be
called in the server, do not add any code that could some memory leaks (attach
listeners, etc)
- Avoid dispatching actions if the data is already there, remember that the
state might come from the server.

## Client vs Server

The project includes some globals to help make code universal.

- *`__CLIENT__`* will be `true` in client mode
- *`__SERVER__`* will be `true` in server mode.

One useful case is when defining components with styles. You can import
styles only in the client using something like this:

```javascript
import React from 'react';

if (__CLIENT__) {
  require('style.css');
}

class MyStylishComponent extends React.Component {
 ...
}
```

The method `componentDidMount` is called *only* in the client. You can add client
only code there, however be careful not to add anything that will be needed for
rendering.

### Pitfalls

- Remember that code will be executed both in the server and in the client. *Do not*
use singletons, memoization or globals. Global states will be shared across
requests possibly leaking sensitive information.

## Flux Actions

This application uses the
[`flux standard action standard`](https://github.com/acdlite/flux-standard-action).
Using a standard action enables code reuse, adding middleware and a more human
friendly object. The helper to create actions will create actions in
this format.

Example actions:

```javascript
{
  type: 'INCREMENT_COUNTER',
  payload: null
}
```

```javascript
{
  type: 'LOAD_USER',
  payload: myPromise
}
```

```javascript
{
  type: 'LOAD_USER',
  payload: anError,
  error: true
}
```

```javascript
{
  type: 'LOAD_USER',
  payload: {
    userId: 1
  },
  meta: {
    token: '3423-123'
  }
}
```


