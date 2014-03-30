// Generated on 2014-02-21 using generator-webapp-kashiro 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
//

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-config')(grunt);

    // register tasks
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', ['jshint', 'karma']);

    grunt.registerTask('stg', [
        'clean:dist',
        'concurrent:stg',
        'autoprefixer',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:stg'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
