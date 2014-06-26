/**
 * @name Mocker
 * @fileOverview Creates new context for requirejs to mock module's dependencies
 * @author sergey
 */
define(function () {
  'use strict';
  var cnt = 0;

  return function(stubs) {
    var map = {};
    cnt++;

    for (var key in stubs) {
      if (stubs.hasOwnProperty(key)) {
        var stubName = ['stub', key.replace(/\//g, '_'), cnt].join('_');
        map[key] = stubName;
        (function (name, value){
          return define(name, function () {
            return value;
          });
        })(stubName, stubs[key]);
      }
    }

    return require.config({
      context: "context_" + cnt,
      map: {
        "*": map
      },
      baseUrl: require.s.contexts._.config.baseUrl
    });
  };
});