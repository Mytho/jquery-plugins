module.exports = function( grunt ){
    grunt.initConfig({
        pkg: {
            "name": "jQuery-Plugins",
            "author": {
                "name": "T. Zengerink",
                "email": "t.zengerink@gmail.com"
            },
            "lisence": {
                "type": "MIT",
                "url": "https://raw.github.com/Mytho/jquery-plugins/master/LISENCE.md"
            }
        },
        meta: {
            banner: "/*!\n" +
                " * <%= pkg.name %>\n" +
                " * Author: <%= pkg.author.name %> (<%= pkg.author.email %>)\n" +
                " * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n" +
                " * <%= pkg.lisence.type %> lisenced, <%= pkg.lisence.url %>\n" +
                " */"
        },
        coffee: {
            plugins: {
                src: ["build/plugins.coffee"],
                dest: "build/"
            }
        },
        concat: {
            plugins: {
                src: [
                    "coffee/plugins.coffee",
                    "coffee/dialog.coffee",
                    "coffee/tooltip.coffee"
                ],
                dest: "build/plugins.coffee"
            },
            less: {
                src: [
                    "less/plugins.less",
                    "less/dialog.less",
                    "less/tooltip.less"
                ],
                dest: "build/plugins.less"
            }
        },
        less: {
            less: {
                files: {
                    "build/plugins.css": "build/plugins.less"
                }
            }
        },
        docco: {
            plugins: {
                src: ["build/plugins.coffee"]
            }
        },
        lint: {
            plugins: ["grunt.js"]
        },
        jshint: {
            options: {
                "bitwise"   : true,
                "browser"   : true,
                "camelcase" : true,
                "curly"     : true,
                "eqeqeq"    : true,
                "forin"     : true,
                "immed"     : true,
                "indent"    : 4,
                "latedef"   : true,
                "maxerr"    : 50,
                "newcap"    : true,
                "noarg"     : true,
                "noempty"   : true,
                "nonew"     : true,
                "onevar"    : true,
                "plusplus"  : false,
                "quotmark"  : "double",
                "regexp"    : true,
                "shadow"    : true,
                "strict"    : false,
                "trailing"  : true,
                "undef"     : true,
                "unused"    : true,
                "white"     : false,
                "predef"    : ["jQuery", "module"]
            }
        },
        min: {
            plugins: {
                src: ["<banner>", "build/plugins.js"],
                dest: "plugins.min.js"
            }
        },
        cssmin: {
            less: {
                src: ["build/plugins.css"],
                dest: "plugins.min.css"
            }
        },
        watch: {
            plugins: {
                files: ["coffee/*.coffee"],
                tasks: "concat:plugins coffee:plugins lint:plugins min:plugins"
            },
            less: {
                files: ["less/*.less"],
                tasks: "concat:less less:less cssmin:less"
            }
        }
    });

    grunt.loadNpmTasks("grunt-coffee");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-css");
    grunt.loadNpmTasks("grunt-docco");

    grunt.registerTask("default", "concat coffee lint less min docco cssmin");
};
