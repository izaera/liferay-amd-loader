'use strict';

/**
 * Creates an instance of PkgLoader class.
 *
 * @constructor
 * @param {object=} loader - The owning Loader object.
 */
function PkgLoader(loader) {
    this._loader = loader;
    this._modules = {};
}

PkgLoader.prototype = {
    constructor: PkgLoader,

    require: function(moduleName, successCallback, failureCallback) {
        this._require(moduleName)
            .then(successCallback)
            .catch(failureCallback);
    },

    define: function(name, dependencies, implementation, config) {
        var self = this;

        console.log('DEFINE', name, dependencies);

        var pkgsConfig = self._getConfig().packages;
        var pkgName = self._getPackageName(name);
        var pkgConfig = pkgsConfig[pkgName];

        var resolvedDependencies = [];
        var promises = [];
        var exports;

        for (var i=0; i < dependencies.length; i++) {
            var dependency = dependencies[i];

            if (dependency === 'require') {
                resolvedDependencies.push(function() {
                    // TODO: implement local require
                    throw new Error('Local require not implemented yet');
                });

            } else if (dependency === 'module') {
                exports = { exports: {} };
                resolvedDependencies.push(exports);

            } else if (dependency === 'exports') {
                exports = {};
                resolvedDependencies.push(exports);

            } else {
                var version = pkgConfig.dependencies[dependency];
                var versionedDependency = dependency + '@' + version;

                promises.push(self._require(versionedDependency).then(function(module) {
                    resolvedDependencies.push(module)
                }));
            }
        }

        Promise.all(promises).then(function() {
            implementation.apply(implementation, resolvedDependencies);

            console.log('DEFINED', name);
            self._modules[name]._resolve(exports.exports || exports);
        })
        .catch(function(err) {
            console.log('ERROR defining module', name, err);
            self._modules[name]._reject(err);
        })
    },

    _getConfig: function() {
        return this._loader._getConfigParser().getConfig();
    },

    /*
     * requires a module and returns a promise resolved when the module is
     * defined
     */
    _require: function(moduleName) {
        var self = this;

        var pkgsConfig = self._getConfig().packages;
        var pkgName = self._getPackageName(moduleName)
        var pkgConfig = pkgsConfig[pkgName];

        if (moduleName == pkgName) {
            moduleName += '/' + pkgConfig.main;
        }

        var url = moduleName.replace(pkgName, pkgConfig.path);

        return self._loadModule(moduleName, url);
    },

    /*
     * get package name from module name
     */
    _getPackageName: function(module) {
        var pos = module.indexOf('/');
        if (pos == -1) {
            return module;
        } else {
            return module.substring(0, pos);
        }
    },

    /*
     * loads a module from a URL and returns a promise resolved when the module
     * is defined
     */
    _loadModule: function(moduleName, url) {
        var self = this;

        console.log('LOAD', url);

        var promise = new Promise(function(resolve, reject) {
            var moduleDesc = {
                exports: undefined,
                promise: promise,
                _resolve: function(module) {
                    console.log('RESOLVED', url);
                    moduleDesc.exports = module;
                    delete moduleDesc._resolve;
                    delete moduleDesc._reject;
                    resolve(module);
                },
                _reject: function(err) {
                    console.log('REJECTED', url, err);
                    delete moduleDesc._resolve;
                    delete moduleDesc._reject;
                    reject(err);
                }
            };

            self._modules[moduleName] = moduleDesc;

            self._loadScript(url).then(function() {
                // // TODO: tune timeout
                // window.setTimeout(function() {
                //     console.log('ERRORED', url);
                // }, 5000);
            })
            .catch(function(error) {
                reject(error);
            });
        });

        return promise;
    },

    /*
     * loads a script from a URL and returns a promise resolved when the script
     * is loaded
     */
    _loadScript: function(url) {
        var self = this;

        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');

            script.src = url;

            // On ready state change is needed for IE < 9, not sure if that is needed anymore,
            // it depends which browsers will we support at the end
            script.onload = script.onreadystatechange = function() { /* istanbul ignore else */
                if (!this.readyState || /* istanbul ignore next */ this.readyState === 'complete' || /* istanbul ignore next */ this.readyState === 'load') {
                    script.onload = script.onreadystatechange = null;

                    resolve(script);

                    // self.emit('scriptLoaded', url.modules);
                }
            };

            // If some script fails to load, reject the main Promise
            script.onerror = function() {
                document.head.removeChild(script);

                reject(script);
            };

            document.head.appendChild(script);
        });
    }
}