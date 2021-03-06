module.exports = function (karma) {
	return {
		basePath: '..',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'chai', 'sinon'],

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// level of logging
		// possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
		logLevel: karma.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeNoSandbox'],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		port: 2000,

		plugins: [
			require('karma-jasmine'),
			require('karma-chai'),
			require('karma-sinon'),
			require('karma-chrome-launcher')
		],

		customLaunchers: {
			ChromeNoSandbox: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},

		files: [
			// polyfills
			{ pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false },

			// allow for importing these
			{ pattern: 'node_modules/**/*', included: false, watched: false },
			{ pattern: 'system.config.js', included: false, watched: true },

			// shim to run the unit tests
			{ pattern: 'config/karma-test-shim.js', included: true, watched: true },

			{ pattern: 'source/**/*', included: false, watched: true }
		],
	};
};
