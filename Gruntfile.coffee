module.exports = ( grunt ) ->
  npmTasks = [
      "grunt-contrib-compass"
      "grunt-contrib-cssmin"
      "grunt-contrib-coffee"
      "grunt-contrib-uglify"
      "grunt-contrib-jade"
      "grunt-contrib-concat"
      "grunt-contrib-copy"
      "grunt-contrib-clean"
    ]

  grunt.initConfig
    meta:
      src: "_assets"
      src_css: "<%= meta.src %>/stylesheets"
      src_js: "<%= meta.src %>/javascripts"
      assets: "assets"
      assets_css: "stylesheets"
      assets_js: "javascripts"
      vendor: "vendors"
    copy:
      html5shiv:
        src: "<%= meta.vendor %>/html5shiv/dist/html5shiv-printshiv.min.js"
        dest: "<%= meta.assets_js %>/html5shiv-printshiv.min.js"
      jquery:
        src: "<%= meta.vendor %>/jquery/jquery.min.js"
        dest: "<%= meta.assets_js %>/jquery.min.js"
    cssmin:
      site_css:
        files:
          "<%= meta.assets_css %>/highlight.css": "<%= meta.assets_css %>/highlight.css"
    compass:
      compile:
        options:
          sassDir: "<%= meta.src_css %>"
          cssDir: "<%= meta.assets_css %>"
          imagesDir: ""
          force: true
          outputStyle: "compressed"
      ourairyu:
        options:
          sassDir: "<%= meta.src_css %>"
          cssDir: "<%= meta.assets_css %>"
          imagesDir: "dev"
          force: true
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
      common:
        files:
          "<%= meta.assets_js %>/site.js": ["<%= meta.assets_js %>/site.js"]
          "<%= meta.assets_js %>/demo.js": ["<%= meta.assets_js %>/demo.js"]
      pages:
        expand: true
        cwd: "<%= meta.assets_js %>/pages"
        src: ["**/*.js"]
        dest: "<%= meta.assets_js %>/pages"

  grunt.loadNpmTasks task for task in npmTasks

  # Default task
  grunt.registerTask "default", ["compass:compile", "coffee", "uglify"]

  # For Ourairyu
  grunt.registerTask "ourairyu", ["compass:ourairyu", "coffee", "uglify"]
