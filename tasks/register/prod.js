module.exports = function (grunt) {
	grunt.registerTask('prod', [
		//'compileAssets',
		//'concat',
    'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build'
		//'uglify',
		//'cssmin',
		//'sails-linker:prodJs',
		//'sails-linker:prodStyles',
		//'sails-linker:devTpl',
		//'sails-linker:prodJsJade',
		//'sails-linker:prodStylesJade',
		//'sails-linker:devTplJade'
	]);
};

