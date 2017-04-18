'use strict';

/**
 * Creates an instance of PkgLoader class.
 *
 * @constructor
 * @param {object=} loader - The owning Loader object.
 * @param {object=} configParser - The ConfigParser object.
 */
function PkgLoader(loader, configParser) {
    this._loader = loader;
    this._config = configParser.getConfig();
    this._pkgsConfig = this._config.packages || {};
}

PkgLoader.prototype = {
    constructor: PkgLoader,

    /**
     * Declares requested modules on the fly if they are found to be living
     * inside any configured package.
     *
     * @param {array|string} moduleNames an array with module names or a single
     *        module name given as a String
     * @return {array|string} the original module name(s) rewritten as needed
     *         (usually to append the main script if no path was specified)
     */
    declarePackageModules: function(moduleNames) {
        var returnScalar = false;

        if (!Array.isArray(moduleNames)) {
            moduleNames = [moduleNames];
            returnScalar = true;
        }

        var rewrittenModuleNames = [];

        for (var i=0; i < moduleNames.length; i++) {
            var moduleName = moduleNames[i];
            var pkgConfig = this._getPkgConfig(moduleName);

            if (pkgConfig) {
                console.log("PACKAGE EXISTS FOR", moduleName);

                moduleName = this.appendMainScript(moduleName);

                // Declare module on-the-fly so that it is loaded from package
                this._loader.addModule({
                    name: moduleName,
                    // TODO: can we use Object.keys ? IE8 does not support it
                    dependencies: Object.keys(pkgConfig.dependencies),
                    dependencyVersions: pkgConfig.dependencies,
                    path: this._config.packagesPath + '/' + moduleName
                });
            }

            rewrittenModuleNames.push(moduleName);
        }

        return returnScalar ? rewrittenModuleNames[0] : rewrittenModuleNames;
    },

    /**
     * Translates unqualified dependencies of a module based on the package
     * configuration of the module (if any).
     *
     * @param {string} moduleName the module name
     * @param {array|string} dependencies the module dependencies (keyword
     *        dependencies are left untranslated)
     * @return {array} the rewritten qualified dependencies
     */
    translatePackageDependencies: function(moduleName, dependencies) {
        var returnScalar = false;

        if (!Array.isArray(dependencies)) {
            dependencies = [dependencies];
            returnScalar = true;
        }

        var pkgConfig = this._getPkgConfig(moduleName);

        if (!pkgConfig) {
            return dependencies;
        }

        var translatedDependencies = [];

        global.Utils.forEachDependency(
            dependencies,
            function(dependency, isKeyword, i) {
                if (!isKeyword) {
                    var version = pkgConfig.dependencies[dependency];

                    dependency += '@' + version
                }

                translatedDependencies.push(dependency);
            });

        return returnScalar ? translatedDependencies[0] : translatedDependencies;
    },

    /**
     * Appends package.json's main script to module names if necessary.
     *
     * @param {array|string} moduleNames an array with module names or a single
     *        module name given as a String
     * @return {array|string} the original module name(s) rewritten as needed
     *         (usually to append the main script if no path was specified)
     */
    appendMainScript: function(moduleNames) {
        var returnScalar = false;

        if (!Array.isArray(moduleNames)) {
            moduleNames = [moduleNames];
            returnScalar = true;
        }

        var rewrittenModuleNames = [];

        for (var i = 0; i < moduleNames.length; i++) {
            var moduleName = moduleNames[i];

            if (this._isPackageName(moduleName)) {
                var pkgConfig = this._pkgsConfig[moduleName];

                if (pkgConfig) {
                    moduleName += '/' + pkgConfig.main;
                }
            }

            rewrittenModuleNames.push(moduleName);
        }

        return returnScalar ? rewrittenModuleNames[0] : rewrittenModuleNames;
    },

    /**
     * Get the configuration of a package given one of its modules name.
     *
     * @protected
     * @param {string} moduleName a module name
     * @return {object} the configuration of the package containing the module
     */
    _getPkgConfig: function(moduleName) {
        var pkgName = this._getPkgName(moduleName);

        return this._pkgsConfig[pkgName];
    },

    /**
     * Get the name of the package containing a module.
     *
     * @protected
     * @param {string} moduleName a module name
     * @return {object} the name of the package containing the module
     */
    _getPkgName: function(moduleName) {
        return moduleName.split('/')[0];
    },

    /**
     * Check whether or not a module name refers to the canonical name of the
     * package containing it.
     *
     * @protected
     * @param {string} moduleName a module name
     * @return {boolean} true if module name is a package name too
     */
    _isPackageName: function(moduleName) {
        return moduleName.indexOf('/') == -1;
    }
}