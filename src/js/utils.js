'use strict';

function forEachDependency(dependencies, callback) {
    for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];

        var isKeyword =
            dependency === 'exports' ||
            dependency === 'module' ||
            dependency === 'require';

        callback(dependency, isKeyword, i);
    }
}