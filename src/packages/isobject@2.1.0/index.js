define('isobject@2.1.0/index.js', ['module', 'require', 'isarray'], function (module, require) {
    /*!
     * isobject <https://github.com/jonschlinkert/isobject>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     */

    'use strict';

    var isArray = require('isarray');

    module.exports = function isObject(val) {
      return val != null && typeof val === 'object' && isArray(val) === false;
    };
});