/*global mocha, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () { };
window.expect = chai.expect;

var basePath = '/base/';
var appPath = basePath + 'source/';

function isJsFile(path) {
	return endsWith(path, '.js');
}

function isSpecFile(path) {
	return endsWith(path, '.spec.js');
}

function isAppFile(path) {
	return isJsFile(path) && (path.substr(0, appPath.length) == appPath);
}

function endsWith(path, ending) {
	return path.slice(-ending.length) == ending;
}

var allSpecFiles = Object.keys(window.__karma__.files)
	.filter(isSpecFile)
	.filter(isAppFile);

// Load our SystemJS configuration.
System.config({
	baseURL: basePath
});

System.import('system.config.js')
.then(function () {
	// Finally, load all spec files.
	// This will run the tests directly.
	return Promise.all(
		allSpecFiles.map(function (moduleName) {
			return System.import(moduleName);
		}));
}).then(__karma__.start, __karma__.error);
