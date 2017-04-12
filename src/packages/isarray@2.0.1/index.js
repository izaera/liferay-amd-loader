define('isarray@2.0.1/index.js', ['module'], function (module) {
  'use strict';

  var toString = {}.toString;

  module.exports = /*Array.isArray ||*/ function (arr) {
    console.log("isArray 2.0.1 called");
    return toString.call(arr) == '[object Array]';
  };
});
//# sourceMappingURL=index.js.map