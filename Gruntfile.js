module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		clean: [
			'public'
		],
		concat: {
			src: ['app/scripts/app.js'],
			dest: 'public/scripts/main.js'
		},
		useminPrepare: {
			html: 'app/index.html',
			options: {
				dest: 'public'
			}
		},
		usemin: {
			html: ['public/index.html'],
			options: {
				dirs: ['app']
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'app',
						src: ['robots.txt', 'favicon.ico'],
						dest: 'public'
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components',
						src: [
							'jquery/jquery.min.js'
						],
						dest: 'public/scripts'
					}
				]
			}
		}
	});

	grunt.registerTask('build', [
	    'clean',
		'useminPrepare',
	    //'concat',
		'copy',
		'usemin'
	]);

	grunt.registerTask('default', ['build']);

};
