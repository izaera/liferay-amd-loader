import cfg from './fixture/config.js';
import Config from '../config';
import DependencyResolver from '../dependency-resolver';

let config;
let dependencyResolver;

describe('DependencyResolver', () => {
	beforeEach(() => {
		config = new Config(cfg);
		dependencyResolver = new DependencyResolver(config);

		window.fetch = jest.fn().mockImplementation(param => {
			let encodedModules = param.split(
				'/o/js_resolve_modules?modules='
			)[1];

			let modules = decodeURIComponent(encodedModules);

			return Promise.resolve({
				text: () => Promise.resolve(JSON.stringify(modules.split(','))),
			});
		});
	});

	it('should throw an exception if no modules are specified', () => {
		expect(() => dependencyResolver.resolve()).toThrow();
	});

	it('should resolve module', () => {
		return dependencyResolver.resolve(['aui-core']).then(dependencies => {
			expect(dependencies).toEqual(['aui-core']);
		});
	});

	it('should resolve multiple modules', () => {
		return dependencyResolver
			.resolve(['aui-base', 'aui-core', 'aui-node', 'aui-dom-node'])
			.then(dependencies => {
				expect(dependencies).toEqual([
					'aui-base',
					'aui-core',
					'aui-node',
					'aui-dom-node',
				]);
			});
	});

	it('should resolve with cached resolution', async () => {
		expect(window.fetch.mock.calls.length).toBe(0);

		let dependencies = await dependencyResolver.resolve(['isobject@2.1.0']);

		expect(dependencies).toEqual(['isobject@2.1.0']);
		expect(window.fetch.mock.calls.length).toBe(1);

		dependencies = await dependencyResolver.resolve(['isobject@2.1.0']);

		expect(Object.keys(dependencyResolver._cachedResolutions)).toContain(
			'isobject@2.1.0'
		);
		expect(dependencies).toEqual(['isobject@2.1.0']);
		expect(window.fetch.mock.calls.length).toBe(1);
	});
});