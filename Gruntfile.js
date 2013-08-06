module.exports = function(grunt) {

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
		copy: {
			app: {
				files: [
					{
						expand: true,
						cwd: 'app',
						src: [
							'robots.txt',
							'favicon.ico',
							'index.html'
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
		'usemin'
	]);

	grunt.registerTask('default', ['build']);

};
