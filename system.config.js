var map = {};

var packages = {
	'source': {
		defaultExtension: 'js',
	},
	'lodash': {
		main: 'index.js',
	},
	'node_modules': {
		defaultExtension: 'js',
	},
};

System.config({
	map: map,
	packages: packages,
});
