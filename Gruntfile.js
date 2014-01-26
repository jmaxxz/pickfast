module.exports = function(grunt) {
  var src = ['src/modules/**/*.js'];
  var specs = ['src/Specs/**/*Spec.js'];
  var files = ['Gruntfile.js'].concat(src).concat(specs);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    notify:{
      success:{
        options:{
          title:'Good job captain',
          message:'everything is shiny'
        }
      }
    },
    jshint: {
      files: files,
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
        }
      }
    },
    jasmine: {
      pivotal: {
      src: src,
      options: {
          keepRunner: true,
          specs: specs,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'bin/coverage/coverage.json',
            report: {
              type:'lcov',
              options: {
                dir:'bin/coverage'
              }
            }
          }
        }
      }
    },
    coveralls: {
      options: {
        src: 'bin/coverage/lcov.info'
      }
    },
    watch: {
      files: files,
      tasks: ['jshint', 'jasmine', 'notify:success']
    }
  });

  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint', 'jasmine', 'notify:success']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
};