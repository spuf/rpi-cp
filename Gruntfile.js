module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        clean: {
            app: [
                'public'
            ]
        },
        concat: {},
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'public'
            }
        },
        usemin: {
            html: ['public/index.html'],
            options: {
                dirs: ['public']
            }
        },
        uglify: {},
        rev: {
            dist: {
                files: {
                    src: [
                        'public/scripts/{,*/}*.js'
                    ]
                }
            }
        },
        copy: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: [
                            'robots.txt',
                            'favicon.ico',
                            'index.html',
                            'components/**/*'
                        ],
                        dest: 'public'
                    }
                ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'concat',
        'copy',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', ['build']);

};
