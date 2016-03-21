# Tests

## Front-ends are about users
Unit testing is a great way to guarentee a component does the right thing every time, check our validation logic, verify data transformations, any other operation that can be isolated. 
However front-end code isn’t about manipulating data, it’s about user events and rendering the right views at the right time.

Here’s what I want to be able to test:
* Test rendered components
* Test user events
* Test the response to those events
* Make sure the right things render at the right time
* Re-run tests on file changes
* Work with continuous integration systems like Travis


## Configuration
We use mocha for javascript unit test. To create a test file, use the convention `FILENAME.test.js` so if you were writing unit tests for the utility file `foo.js`, the test file should be called `foo.test.js`.
To change any of the mocha parameters, edit the `tests/mocha.opts` file.


## Create A Test
Tests should live the same directory as the code you are testing.  The test file should match the synatax above `FILENAME.test.js`.

```
 For example:
    app/components/examples/my-component.js
    app/components/examples/my-component.test.js
```

