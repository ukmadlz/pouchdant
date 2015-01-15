module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    watch: {
      livereload: {
        options:{
          livereload: true
        },
        files: [
          'src/**',
        ]
      },
      files: ['src/**'],
      tasks: ['jshint']
    },

    connect: {
      livereload: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: '.',
          open: true,
          livereload: true,
          directory: 'src'
        }
      }
    },

    copy: {
      dist: {
        files: [ {src: 'src/index.html', dest: 'dist/index.html'} ]
      }
    },

    'useminPrepare': {
      options: {
        dest: 'dist'
      },
      html: 'src/index.html'
    },

    usemin: {
      html: ['dist/index.html']
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:ukmadlz/pouchdant.git',
          branch: 'gh-pages'
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', 'Validate app', ['jshint']);

  grunt.registerTask('build', 'Build finised app', ['useminPrepare', 'copy', 'concat', 'cssmin', 'uglify', 'usemin']);

  grunt.registerTask('serve',
      'Run presentation locally and start watch process (living document).',
      ['connect:livereload',
      'watch']
    );

  grunt.registerTask('deploy', 'Push to GitHub pages', ['test', 'build', 'buildcontrol']);

  grunt.registerTask('default', ['test','serve']);

};
