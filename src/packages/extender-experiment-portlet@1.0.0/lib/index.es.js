define('extender-experiment-portlet@1.0.0/lib/index.es', ['exports', 'require', 'isarray', 'isobject', './m1', '../lib2/lib/m2'], function (exports, require, _isarray, _isobject, _m1, _m2) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.render = render;

	var _isarray2 = _interopRequireDefault(_isarray);

	var _isobject2 = _interopRequireDefault(_isobject);

    var _m12 = _interopRequireDefault(_m1);

    var _m22 = _interopRequireDefault(_m2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function render() {
		console.log("import isArray from 'isarray' in index.es.js returned", _isarray2.default);
		console.log('Calling isArray([]) from index.es.js');
		var t = (0, _isarray2.default)([]);
		console.log('which returns', t);

		console.log("import isObject from 'isobject' in index.es.js returned", _isobject2.default);
		console.log('Calling isObject([]) from index.es.js');
		t = (0, _isobject2.default)([]);
		console.log('which returns', t);

        console.log('m1 -', _m12.default);

        console.log('m2 -', _m22.default);

        console.log('required m1 -', require('./m1').default);

        console.log('required m2 -', require('../lib2/lib/m2').default);
	}
});