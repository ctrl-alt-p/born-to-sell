# Development

The project has many tools to aid development.

## Dev Server

```
npm run dev
```

Starts a server in development mode. The node server will be reloaded
automatically when the code changes. This will also start a webpack server
with hot-reload enabled.

## Scaffolding

A yeoman generator is included to quickly scaffold views and redux state slices 

install yeoman:
```
npm install -g yo
```

install generator:
```
make install-generator
```

- to scaffold a view: `yo rx:view`
- to scaffold a component: `yo rx:component`
- to scaffold a state slice: `yo rx:redux`

## Debug logs

The project uses [`debug`](https://github.com/visionmedia/debug) to log debug
messages. `debug` provides namespaced logging so make sure to use the
`getDebugLogger` at `lib/logger.js` to create loggers with the correct
namespace. Feel free to use debug logs sparingly, the can be shut down in
production so no need to remove them! If you had problems with a piece of code
it is very likely that someone else will too!

Example:

```javascript
/* baz.js */
import getDebugLogger from './lib/logger';

debug = getDebugLogger('baz');

function fooBar() {
  debug('fooBar');
  ...
}
```

If you want to enable logs in the *backend* run the server like this:
- `DEBUG=blink-web:* npm run dev`

In the backend they are enabled by default, you can disable them using
the global variable `_debug` using the following snippet in console:

```javascript
_debug.disable(); // enable it

_debug.enable(namespace); // enable it for a restricted namespace
```
