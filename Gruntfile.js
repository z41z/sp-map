var JSUnits = {
	base:
	{
		src: [
			'static/distance.js',
			'static/tool.js',
			'static/infobox.js',
		]
	}
}

module.exports = function(grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify:
		{
			base:
			{
				options:
				{
					banner: '/*! BMapLib libraries build on <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					compress: { drop_console: true }
				},
				src: JSUnits.base.src,
				dest: 'dist/bmaplib.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('jsminify', ['uglify']);
	grunt.registerTask('default', ['uglify']);
};
