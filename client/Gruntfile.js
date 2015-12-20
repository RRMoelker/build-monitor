module.exports = function(grunt) {

  grunt.initConfig({
    favicons: {
      options: {
        appleTouchBackgroundColor: 'none',
        //html: 'index_icons.html' //generate html include code
      },
      icons: {
        src: 'icon_192.png',
        dest: 'icon'
      }
    }
  });

  grunt.loadNpmTasks('grunt-favicons');

  grunt.registerTask('default', ['favicons']);
};