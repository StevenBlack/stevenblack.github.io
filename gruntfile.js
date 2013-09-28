/* jshint node: true */

module.exports = function( grunt ) {
	"use strict";

	// Project configuration.
	grunt.initConfig( {

		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),

		// Task configuration.
		clean: { dist: [ 'dist' ] },
		jshint: {
			options   : { jshintrc: 'js/.jshintrc' },
			gruntfile : { src: 'Gruntfile.js' },
			src       : { src: [ 'js/*.js' ] },
			test      : { src: [ 'js/tests/unit/*.js' ] }
		},
		concat: {
			bootstrap: {
				src: [
						'js/transition.js',
						'js/alert.js',
						'js/button.js',
						'js/carousel.js',
						'js/collapse.js',
						'js/dropdown.js',
						'js/modal.js',
						'js/tooltip.js',
						'js/popover.js',
						'js/scrollspy.js',
						'js/tab.js',
						'js/affix.js'
					],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			mincss : {
				src: [ 'css/bootstrap.min.css', 'css/font-awesome.min.css' ],
				dest: 'css/sbc.min.css'
			}
		},

		recess: {
			options:   { compile: true },
			bootstrap: { src: [ 'less/bootstrap.less' ], dest: 'dist/css/<%= pkg.name %>.css' },
			min:       { options: { compress: true }, src: [ 'less/bootstrap.less' ], dest: 'dist/css/<%= pkg.name %>.min.css' },
			theme:     { src: [ 'less/theme.less' ], dest: 'dist/css/<%= pkg.name %>-theme.css' },
			theme_min: { options: { compress: true }, src: [ 'less/theme.less' ], dest: 'dist/css/<%= pkg.name %>-theme.min.css' }
		},

		copy      : { fonts: { expand: true, src: [ "fonts/*" ], dest: 'dist/' }},
		connect   : { server: { options: { port: 3000, base: '.' } } },
		validation: { options: { reset: true }, files: { src: [ "_site/**/*.html" ] } }
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-html-validation' );

	// not implemented in the SBC context
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-recess' );
	grunt.loadNpmTasks( 'browserstack-runner' );


	// Docs HTML validation task
	grunt.registerTask( 'validate-html', [ 'validation' ] );

	// Combine files task
	grunt.registerTask( 'concat-mincss', [ 'concat:mincss' ] );


	// NOT YET INPLEMENTED
	// Test task.
	var testSubtasks = [ 'dist-css', 'jshint', 'qunit', 'validate-html' ];
	// Only run BrowserStack tests under Travis
	if ( process.env.TRAVIS ) {
		// Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
		if ( (process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false' ) || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY ) {
			testSubtasks.push( 'browserstack_runner' );
		}
	}

	grunt.registerTask( 'test', testSubtasks );

	// JS distribution task.
	grunt.registerTask( 'dist-js', [ 'concat:bootstrap', 'uglify' ] );

	// CSS distribution task.
	grunt.registerTask( 'dist-css', [ 'recess' ] );

	// Fonts distribution task.
	grunt.registerTask( 'dist-fonts', [ 'copy' ] );

	// Full distribution task.
	grunt.registerTask( 'dist', [ 'clean', 'dist-css', 'dist-fonts', 'dist-js' ] );

	// Default task.
	grunt.registerTask( 'default', [ 'test', 'dist', 'build-customizer' ] );

	// task for building customizer
	grunt.registerTask( 'build-customizer', 'Add scripts/less files to customizer.', function () {
		var fs = require( 'fs' )

		function getFiles( type ) {
			var files = {}
			fs.readdirSync( type )
				.filter( function ( path ) { return type == 'fonts' ? true : new RegExp( '\\.' + type + '$' ).test( path ) } )
				.forEach( function ( path ) { return files[ path ] = fs.readFileSync( type + '/' + path, 'utf8' ) } )
				return 'var __' + type + ' = ' + JSON.stringify( files ) + '\n'
		}

		var customize = fs.readFileSync( 'customize.html', 'utf-8' )
		var files = getFiles( 'js' ) + getFiles( 'less' ) + getFiles( 'fonts' )
		fs.writeFileSync( 'assets/js/raw-files.js', files )
	});
};