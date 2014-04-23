module.exports = ( grunt ) ->
  npmTasks = [
      "grunt-contrib-compass"
      "grunt-contrib-coffee"
      "grunt-contrib-uglify"
      "grunt-contrib-jade"
      "grunt-contrib-concat"
      "grunt-contrib-copy"
      "grunt-contrib-clean"
    ]

  grunt.initConfig
    meta:
      src: "src"
      src_img: "<%= meta.src %>/images"
      src_css: "<%= meta.src %>/stylesheets"
      src_js: "<%= meta.src %>/javascripts"
      assets: "assets"
      assets_img: "<%= meta.assets %>/images"
      assets_css: "<%= meta.assets %>/stylesheets"
      assets_js: "<%= meta.assets %>/javascripts"
    compass:
      compile:
        options:
          sassDir: "<%= meta.src_css %>"
          cssDir: "<%= meta.assets_css %>"
          imagesDir: "<%= meta.src_img %>"
          outputStyle: "compressed"
    coffee:
      options:
        bare: false
        separator: "\x20"
      build:
        expand: true
        cwd: "<%= meta.src_js %>"
        src: ["**/*.coffee"]
        dest: "<%= meta.assets_js %>"
        ext: ".js"
    uglify:
      build:
        expand: true
        cwd: "<%= meta.assets_js %>/pages"
        src: ["**/*.js"]
        dest: "<%= meta.assets_js %>/pages"

  grunt.loadNpmTasks task for task in npmTasks

  # Default task
  grunt.registerTask "default", ["compass", "coffee", "uglify"]
