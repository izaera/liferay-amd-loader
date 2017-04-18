define('extender-experiment-portlet@1.0.0/lib/index.es.js', ['exports', 'isarray', 'isobject'], function (exports, _isarray, _isobject) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.render = render;

	var _isarray2 = _interopRequireDefault(_isarray);

	var _isobject2 = _interopRequireDefault(_isobject);

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
	}
});
//# sourceMappingURL=index.es.js.map