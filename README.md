## requirejs-mocker

> Creates new context for requirejs to mock module's dependencies

### When to use?
When you want to stub the module's dependencies in KarmaJS test runner.
 
### How to install?

    bower install requirejs-mocker --save-dev

### How to use?

1. Load mocker
2. Define your mocks
3. Create new context
4. Load your dependency

## Example
Let's say we have two modules: `foo.js` and `bar.js`. Foo depends on Bar. So, we need to mock it.

Here's the Bar module:

    define(function () {
      return {
        callMe: function () {
          console.log('I am called');
        }
      }
    });

Module `foo.js`

    define(['src/bar'], function (bar) {
      return {
        execute: function () {
          bar.callMe();
        }
      }
    });

The test spec with QUnit:

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
    
