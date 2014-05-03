// Generated on 2014-01-08 using generator-webapp 0.4.6
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // load scripts files
    var scriptsSettings = grunt.file.readJSON('scripts.json'),
        scripts = scriptsSettings.vendor.concat(scriptsSettings.app),
        testFiles = [];

    testFiles = testFiles.concat(scripts);
    testFiles.push('test/spec/**/*.js');

    grunt.log.warn(testFiles);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app : 'app',
            docs: 'docs',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= yeoman.app %>/scripts/**/*.js'
                ],
                tasks: ['jshint']
            },
            jstest: {
                files: ['test/spec/**/*.js'],
                tasks: ['test'],
                options: {
                    livereload: true
                }
            },
            docs: {
                files: [
                    '<%= yeoman.app %>/scripts/**/*.js'
                ],
                tasks: ['docs'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/scripts/**/*.js'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= yeoman.docs %>'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            docs: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.docs %>/*',
                        '!<%= yeoman.docs %>/.git*'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/**/*.js',
                '!<%= yeoman.app %>/scripts/lib/*',
                'test/spec/**/*.js'
            ]
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['mocha', 'expect', 'sinon'],
                    runnerPort: 8080,
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: testFiles
                }
            },
            travis: {
                options: {
                    frameworks: ['mocha', 'expect', 'sinon'],
                    runnerPort: 8080,
                    singleRun: true,
                    browsers: ['PhantomJS','Firefox'],
                    files: testFiles
                }
            }

        },

        jsduck: {
            main: {
                // source paths with your code
                src: [
                    'app/scripts/**/*.js'
                ],

                // docs output dir
                dest: 'docs',

                // extra options
                options: {
                    'title': 'GlobalJS',
                    'builtin-classes': true,
                    'warnings': ['-no_doc', '-dup_member', '-link_ambiguous'],
                    'external': ['XMLHttpRequest']
                }
            }
        },

        concat: {
            dist: {
                src: scriptsSettings.app,
                dest: 'dist/global-concat.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/global.min.js': 'dist/global-concat.js'
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'docs',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', ['newer:jshint', 'karma:unit']);
    grunt.registerTask('travis', ['jshint', 'karma:travis']);

    grunt.registerTask('build', [
        'clean:dist',
        'concat:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('docs', [
        'clean:docs',
        'newer:jshint',
        'jsduck'
    ]);
};
