var __CONFIG__ = {
    url: 'http://localhost:3000/combo?',
    basePath: '/modules',
    combine: true,
    paths: {
    }
};
__CONFIG__.maps = {
    'extender-experiment-portlet@1.0.0': {
        value: 'extender-experiment-portlet@1.0.0/lib/index.es.js',
        exact: true
    },
    'isarray@1.0.0': {
        value: 'isarray@1.0.0/index.js',
        exact: true
    },
    'isarray@2.0.1': {
        value: 'isarray@2.0.1/index.js',
        exact: true
    },
    'isobject@2.1.0': {
        value: 'isobject@2.1.0/index.js',
        exact: true
    },
};
__CONFIG__.modules = {
    'extender-experiment-portlet@1.0.0/lib/index.es.js': {
        'path': '/packages/extender-experiment-portlet@1.0.0/lib/index.es.js',
        'dependencies': ['exports', 'isarray', 'isobject'],
        'dependencyVersions': {
            'isarray': '2.0.1',
            'isobject': '2.1.0'
        }
    },
    'isarray@1.0.0/index.js': {
        'path': '/packages/isarray@1.0.0/index.js',
        'dependencies': ['module', 'require'],
        'dependencyVersions': {}
    },
    'isarray@2.0.1/index.js': {
        'path': '/packages/isarray@2.0.1/index.js',
        'dependencies': ['module', 'require'],
        'dependencyVersions': {}
    },
    'isobject@2.1.0/index.js': {
        'path': '/packages/isobject@2.1.0/index.js',
        'dependencies': ['module', 'require', 'isarray'],
        'dependencyVersions': {
            'isarray': '1.0.0',
        }
    },
};