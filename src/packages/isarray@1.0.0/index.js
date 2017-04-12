define('isarray@1.0.0/index.js', ['module'], function (module) {
  'use strict';

  var toString = {}.toString;

  module.exports = /*Array.isArray ||*/ function (arr) {
    console.log("isArray 1.0.0 called");
    return toString.call(arr) == '[object Array]';
  };
});
//# sourceMappingURL=index.js.map