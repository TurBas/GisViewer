module.exports = function(grunt){

    var scripts = ['./src/client/app/**/*.js'];

    grunt.initConfig({
        jshint: {
            all: scripts,
            options: {
                unused: true,
                reporter: require('jshint-stylish'),
                jshintrc: true
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerInitTask("default", ["jshint"]);
    grunt.registerTask("test", ["karma"]);
};
