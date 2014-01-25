module.exports = function(grunt) {
  var src = ['src/**/*.js'];
  var specs = ['src/**/*Spec.js'];
  var files = src.concat(specs);

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
            helpers: 'spec/*Helper.js'
          }
        }
    },
    watch: {
      files: files,
      tasks: ['jshint', 'jasmine', 'notify:success']
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint', 'jasmine', 'notify:success']);
};