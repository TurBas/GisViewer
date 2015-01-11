// Karma configuration
// Generated on Wed Jan 07 2015 11:51:52 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',

      './src/client/app/app.module.js',
      './src/client/app/**/*.module.js',
      './src/client/app/**/*.js',

      './src/client/test/**/*.spec.js'
    ],

    plugins:[
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/client/app/**/*.js' : 'coverage'
    },

    coverageReporter: {
      type: 'html',
      dir: 'reports/coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'ChromeCanary', 'Firefox', 'Safari', 'PhantomJS'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
