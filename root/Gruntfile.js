'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },

    jscs: {
      gruntfile: {
        files: {
          src: '<%= jshint.gruntfile.src %>'
        }
      },
      test: {
        files: {
          src: '<%= jshint.test.src %>'
        }
      },
      lib: {
        files: {
          src: '<%= jshint.lib.src %>'
        }
      },
      options: {
        config: '.jscsrc'
      }
    },

    mochaTest: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'list',
        clearRequireCache: true
      },
      all: {
        src: ['test/**/*_spec.js']
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jscs:gruntfile', 'jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jscs:lib', 'jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jscs:test', 'jshint:test', 'mochaTest']
      },
      options: {
        interrupt: true
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jscs', 'jshint', 'mochaTest']);
};
