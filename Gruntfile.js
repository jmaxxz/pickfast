module.exports = function(grunt) {
  var src = ['src/modules/**/*.js'];
  var deps = ['node_modules/underscore/*-min.js'];
  var specs = ['src/Specs/**/*Spec.js'];
  var jsFiles = ['Gruntfile.js'].concat(src).concat(specs);
  var lessFilesConfig = [{
    expand: true,
    cwd: 'src/content',
    src: ['**/*.less'],
    dest: 'dist/css',
    ext: '.css'
  }];

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
      files: jsFiles,
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
        }
      }
    },
    jasmine: {
      src: src,
      options: {
          keepRunner: true,
          specs: specs,
          vendor: deps,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'bin/coverage/coverage.json',
            report: [{
              type:'lcov',
              options: {
                dir:'bin/coverage'
              }
            },{
              type: 'text'
            }]
          }
        }
    },
    coveralls: {
      all: {
        src: 'bin/coverage/lcov.info'
      }
    },
    less: {
      dev: {
        files: lessFilesConfig
      },
      dist: {
        options: {
          cleancss: true
        },
        files: lessFilesConfig
      }
    },
    watch: {
      scripts: {
        files: jsFiles,
        tasks: ['jshint', 'jasmine', 'notify:success']
      },
      content: {
        files: ['src/content/**/*.less'],
        tasks: ['less:dev', 'notify:success']
      }
    }
  });

  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['jshint', 'jasmine', 'less:dev', 'notify:success']);
  grunt.registerTask('test', ['jshint', 'jasmine', 'coveralls:all']);
};