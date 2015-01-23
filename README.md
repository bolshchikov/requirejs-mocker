## requirejs-mocker

> Creates new context for requirejs to mock module's dependencies

### When to use?
When you want to stub the module's dependencies in KarmaJS test runner.
 
### How to install?

```bash
bower install requirejs-mocker --save-dev
```

### How to use?

1. Load mocker
2. Define your mocks: object with full path as a key, and mock object as a value
3. Create new context by passing mocks object into mocker
4. Require your dependency in traditional way

### Example
Let's say we have two modules: `foo.js` and `bar.js`. Foo depends on Bar. So, we need to mock it.

Here's the `bar` module:
```js
define(function () {
  return {
    callMe: function () {
      console.log('I am called');
    }
  }
});
```

Module `foo.js`
```js
define(['src/bar'], function (bar) {
  return {
    execute: function () {
      bar.callMe();
    }
  }
});
```

The test spec with QUnit:
```js
define(['mocker', 'sinon'], function (mocker, sinon) {
  
  QUnit.stop();                     // stop the qunit run till the module is loaded
  var fooModule;
   
  var spy = sinon.spy();            // create spy with sinon
  
  var mocks = {                     // create the mock for bar
    'src/bar': { callMe: spy } 
  };
  
  var ctx = mocker(mocks);
  ctx(['src/foo'], function (foo) {
    fooModule = foo;
    QUnit.start()
  });
  
  test('foo.execute', function () {
    foo.execute();
    ok(spy.called);
  });
});
 ```
      
### Credits
Big thanks for inspiration to
* [karma-requirejs setup](https://github.com/scriptfoundry/karma-requirejs-mock)
* [stackoverflow answers](http://stackoverflow.com/questions/11439540/how-can-i-mock-dependencies-for-unit-testing-in-requirejs/11695463#11695463)
    
