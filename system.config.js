var map = {};

var nodeModules = [
	'lodash',
];

var defaultPackages = [
	'lodash',
];

var packages = {
	'source': {
		defaultExtension: 'js',
	},
	'node_modules': {
		defaultExtension: 'js',
	},
};

function setupNodeModule(module) {
	map[module] = `node_modules/${module}`;
}

function setupDefaultPackage(package) {
	packages[package] = { main: 'index.js' };
}

nodeModules.forEach(setupNodeModule);
defaultPackages.forEach(setupDefaultPackage);

System.config({
	map: map,
	packages: packages,
});
