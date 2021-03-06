module.exports = function(grunt) {

  grunt.initConfig({
    // Change the b-fy task to add a transform task
    browserify: {
      js: {
          src: ['./js/script.js'],
          dest: 'dist/app.js'
      },
      options: {
          transform: ['hbsfy']
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true,
        asi: true
      },
      files: ['./js/**/*.js']
    },
    sass: {
      // dist: {
        files: {
          'main.css': './sass/main.scss'
        }
      // }
    },
    watch: {
      javascripts: {
        files: ['./js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['./sass/**/*.sass'],
        tasks: ['sass']
      },
      hbs: {
        files: ['./templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['browserify', 'jshint', 'sass', 'watch']);
};
