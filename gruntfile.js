/*!
 * Steven Black Consulting's Gruntfile
 * http://stevenblack.com
 * Copyright 2014-2015 SBC
 * Licensed under MIT (http://stevenblack.com/MIT_License.html
 */
module.exports = function( grunt ) {
	'use strict';

	var optionsfile = 'gruntoptions.json';
	var _           = require('lodash');
	var pkg         = grunt.file.readJSON( 'package.json' );
	var options     = grunt.file.exists( optionsfile ) ? grunt.file.readJSON( optionsfile ) : {} ;
	var settings    = _.merge( {}, pkg.defaults, options );

	// Project configuration.
	grunt.initConfig( {

		// Metadata.
		pkg: pkg,
		options: options,
		settings: settings,

		clean: {
			'bootstrap-source': [ '<%= settings.location.bootstrap.local %>/' ],
			'fonts': [ '<%= settings.location.deploy.fonts %>/' ],
			'css': [ '<%= settings.location.deploy.css %>/' ],
			'js': [ '<%= settings.location.deploy.js %>/' ]
		},

		copy: {
			'bootstrap-source': {
				nonull: true,
				expand: true,
				cwd: '<%= settings.location.bootstrap.authoritative %>/',
				src: [ 'fonts/*', 'js/*', 'less/**' ],
				dest: '<%= settings.location.bootstrap.local %>/'
			},
			'fontawesome-source': {
				nonull: true,
				expand: true,
				cwd: '<%= settings.location.fontawesome.authoritative %>/',
				src: [ 'fonts/*', 'css/*', 'less/*' ],
				dest: '<%= settings.location.fontawesome.local %>/'
			},
			'bootstrap-tweaks': {
				src: [ 'less/*' ],
				dest: '<%= settings.location.bootstrap.local %>/'
			},
			'bootstrap-fonts': {
				expand: true,
				flatten: true,
				src: [ '<%= settings.location.bootstrap.local %>/fonts/*' ],
				dest: '<%= settings.location.deploy.fonts %>/'
			},
			'fontawesome': {
				expand: true,
				flatten: true,
				src: [ '<%= settings.location.fontawesome.local %>/fonts/*' ],
				dest: '<%= settings.location.deploy.fonts %>/'
			},
			'sitespecificjs' : {
				expand: true,
				flatten: true,
				src:  '<%= settings.location.sitespecific.js %>/*' ,
				dest: '<%= settings.location.deploy.js %>/'
			},
			'sitespecificcss' : {
				expand: true,
				flatten: true,
				src:  '<%= settings.location.sitespecific.css %>/*' ,
				dest: '<%= settings.location.deploy.css %>/'
			}
		},

		concat: {
			bootstrapjs: {
				src: ( function() {
						var cwd = settings.location.bootstrap.local + '/';
						var arr = settings.task.concat.bootstrapjs.src;
						return arr.map(function(file) { return cwd + "/" + file; });
						}()
				),
				dest: '<%= settings.location.deploy.js %>/<%= settings.filename.js %>'
			},
			css : {
				src: [ 'css/<%= pkg.name %>.bootstrap.css', 'css/font-awesome.min.css' ],
				dest: 'css/<%= pkg.name %>.css'
			},
			mincss : {
				src: [ 'css/<%= pkg.name %>.bootstrap.min.css', 'css/font-awesome.min.css' ],
				dest: 'css/<%= pkg.name %>.min.css'
			}
		},

		uglify: {
			options: { report: 'min', compress: true },
			bootstrap: { src: [ '<%= concat.bootstrapjs.dest %>' ], dest: '<%= settings.location.deploy.js %>/<%= settings.filename.jsmin %>' }
		},

		less: {
			compileCore: {
				options: {
					strictMath: true,
					outputSourceFiles: true
				},
				files: { '<%= settings.location.deploy.css %>/<%= settings.filename.css %>': '<%= settings.location.bootstrap.local %>/less/<%= settings.filename.less %>' }
			}
		},

		cssmin: {
			combine: {
				files: {
					'<%= settings.location.deploy.css %>/<%= settings.filename.cssmin %>': [ '<%= settings.location.deploy.css %>/<%= settings.filename.css %>', '_font-awesome/css/font-awesome.css' ]
				}
			}
		}

	});

	// This one-liner replaces multiple grunt.loadNpmTasks() calls
	// See http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	// Bootstrap tasks
	//    cleanup
	grunt.registerTask( 'clean-bootstrap', [ 'clean:bootstrap-source' ] );
	grunt.registerTask( 'clean-fonts', [ 'clean:fonts' ] );

	//    constructing
	grunt.registerTask( 'zzz', [ 'copy:sitespecificjs' ] );
	grunt.registerTask( 'fetch-fresh-bootstrap', [ 'copy:bootstrap-source' ] );
	grunt.registerTask( 'fetch-fresh-fontawesome', [ 'copy:fontawesome-source' ] );
	grunt.registerTask( 'apply-bootstrap-tweaks', [ 'copy:bootstrap-tweaks' ] );
	grunt.registerTask( 'update-fonts', [ 'clean-fonts', 'copy:bootstrap-fonts', 'fetch-fresh-fontawesome', 'copy:fontawesome' ] );
	grunt.registerTask( 'bootstrap', [ 'clean-bootstrap', 'fetch-fresh-bootstrap', 'apply-bootstrap-tweaks', 'update-fonts' ] );

	// Less and css tasks
	grunt.registerTask( 'clean-css', [ 'clean:css' ] );
	grunt.registerTask( 'less-compile', [ 'less:compileCore' ]);
    grunt.registerTask( 'sitespecificcss', [ 'copy:sitespecificcss' ]);
	grunt.registerTask( 'css-minify', [ 'cssmin' ]);
	grunt.registerTask( 'css', [ 'clean-css', 'less-compile', 'sitespecificcss', 'css-minify']);

	// js tasks
	grunt.registerTask( 'clean-js', [ 'clean:js' ] );
	grunt.registerTask( 'js-bootstrap', [ 'concat:bootstrapjs']);
    grunt.registerTask( 'sitespecificjs', [ 'copy:sitespecificjs' ]);
	grunt.registerTask( 'js-minify', [ 'uglify:bootstrap' ]);
	grunt.registerTask( 'js', [ 'clean-js', 'sitespecificjs', 'js-bootstrap', 'js-minify' ]);

	// all
	grunt.registerTask( 'clean-all', ['clean-bootstrap', 'clean-fonts', 'clean-css', 'clean-js' ]);
	grunt.registerTask( 'default', ['bootstrap', 'css', 'js' ]);

};
