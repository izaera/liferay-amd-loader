define('isarray@2.0.1/index.js', ['module', 'require'], function (module, require) {
    var toString = {}.toString;

    module.exports = /*Array.isArray ||*/ function (arr) {
      console.log('isArray 2.0.1 called');
      return toString.call(arr) == '[object Array]';
    };
});