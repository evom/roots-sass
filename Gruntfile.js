'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    sass: {
      dist: {
        options: {
          // sourceMap: true,
          outputStyle: 'nested',
          includePaths: require('node-bourbon').includePaths
        },
        files: {
          'assets/css/main.min.css': [
            'assets/sass/app.scss'
          ]
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'assets/css/main.min.css': [
            'assets/css/main.min.css'
          ]
        }
      }
    },
    uglify: {
      dev: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/bootstrap/transition.js',
            //'assets/js/plugins/bootstrap/alert.js',
            'assets/js/plugins/bootstrap/button.js',
            //'assets/js/plugins/bootstrap/carousel.js',
            'assets/js/plugins/bootstrap/collapse.js',
            'assets/js/plugins/bootstrap/dropdown.js',
            //'assets/js/plugins/bootstrap/modal.js',
            //'assets/js/plugins/bootstrap/tooltip.js',
            //'assets/js/plugins/bootstrap/popover.js',
            //'assets/js/plugins/bootstrap/scrollspy.js',
            'assets/js/plugins/bootstrap/tab.js',
            'assets/js/plugins/bootstrap/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js',
            'assets/js/vendor/jquery.html5-placeholder-shim.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          sourceMap: 'assets/js/scripts.min.js.map',
          sourceMappingURL: '../../',
          beautify: true,
          compress: {
            //drop_console: true
          },
          //mangle: false,
          preserveComments: true
        }
      },
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/bootstrap/transition.js',
            //'assets/js/plugins/bootstrap/alert.js',
            'assets/js/plugins/bootstrap/button.js',
            //'assets/js/plugins/bootstrap/carousel.js',
            'assets/js/plugins/bootstrap/collapse.js',
            'assets/js/plugins/bootstrap/dropdown.js',
            //'assets/js/plugins/bootstrap/modal.js',
            //'assets/js/plugins/bootstrap/tooltip.js',
            //'assets/js/plugins/bootstrap/popover.js',
            //'assets/js/plugins/bootstrap/scrollspy.js',
            'assets/js/plugins/bootstrap/tab.js',
            'assets/js/plugins/bootstrap/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js',
            'assets/js/vendor/jquery.html5-placeholder-shim.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          sourceMap: 'assets/js/scripts.min.js.map',
          sourceMappingURL: '../../',
          beautify: false,
          compress: {
            //drop_console: true
          },
          //mangle: false,
          preserveComments: false
        }
      }
    },
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.min.css',
        cssHandle: 'roots_main',
        js: 'assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
    watch: {
      sass: {
        files: [
          'assets/sass/**/*.scss'
        ],
        tasks: ['sass'/* , 'version' */]
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
          '*.php',
          'Gruntfile.js'
        ]
      }
    },
    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  //grunt.loadNpmTasks('grunt-wp-version');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass',
    'uglify:dev'
    //,'version'
  ]);
  grunt.registerTask('dev', [
    'default',
    'watch'
  ]);
  grunt.registerTask('build', [
    'clean',
    'sass',
    'cssmin',
    'uglify:dist'
  ]);

};
