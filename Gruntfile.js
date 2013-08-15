module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    'build/plugins.js': 'build/plugins.coffee'
                }
            }
        },
        concat: {
            plugins: {
                src: [
                    'coffee/plugins.coffee',
                    'coffee/accordion.coffee',
                    'coffee/dialog.coffee',
                    'coffee/message.coffee',
                    'coffee/tabs.coffee',
                    'coffee/tooltip.coffee'
                ],
                dest: 'build/plugins.coffee'
            },
            less: {
                src: [
                    'less/plugins.less',
                    'less/accordion.less',
                    'less/dialog.less',
                    'less/message.less',
                    'less/tabs.less',
                    'less/tooltip.less'
                ],
                dest: 'build/plugins.less'
            }
        },
        less: {
            less: {
                files: {
                    'build/plugins.css': 'build/plugins.less'
                }
            }
        },
        docco: {
            plugins: {
                options: {
                    output: 'docs'
                },
                src: ['build/plugins.coffee']
            }
        },
        uglify: {
            options: {
                banner: '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                ' * - - -\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Released under <%= pkg.lisence.type %> lisenced\n' +
                ' * <%= pkg.lisence.url %>\n' +
                ' */\n'
            },
            plugins: {
                files: {
                    'plugins.min.js': ['<banner>', 'build/plugins.js']
                }
            }
        },
        cssmin: {
            less: {
                files: {
                    'plugins.min.css': ['build/plugins.css']
                }
            }
        },
        watch: {
            plugins: {
                files: ['<config:coffee.plugins.src>'],
                tasks: 'concat:plugins coffee:plugins'
            },
            less: {
                files: ['<config:less.less.files'],
                tasks: 'less:less cssmin:less'
            }
        }
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-docco');

    // Default Task
    grunt.registerTask('default', ['concat', 'coffee', 'uglify', 'less', 'cssmin', 'docco']);

};
