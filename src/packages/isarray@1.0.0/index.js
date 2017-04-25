define('isarray@1.0.0/index', ['module', 'require'], function (module, require) {
    var toString = {}.toString;

    module.exports = /*Array.isArray ||*/ function (arr) {
      console.log('isArray 1.0.0 called');
      return toString.call(arr) == '[object Array]';
    };
});