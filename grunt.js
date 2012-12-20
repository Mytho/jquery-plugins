module.exports = function( grunt ){
    'use strict';

    grunt.initConfig({
        pkg: {
            'name': 'jQuery-Plugins',
            'author': {
                'name': 'T. Zengerink',
                'email': 't.zengerink@gmail.com'
            },
            'lisence': {
                'type': 'MIT',
                'url': 'https://raw.github.com/Mytho/jquery-plugins/master/LISENCE.md'
            }
        },
        meta: {
            banner: '/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * Author: <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * <%= pkg.lisence.type %> lisenced, <%= pkg.lisence.url %>\n' +
                ' */'
        },
        coffee: {
            plugins: {
                src: ['build/plugins.coffee'],
                dest: 'build/'
            }
        },
        concat: {
            plugins: ['src/*.coffee'],
            dest: 'build/plugins.coffee'
        },
        lint: {
            plugins: ['grunt.js', 'build/plugins.js']
        },
        jshint: {
            options: {
                'bitwise'   : true,
                'browser'   : true,
                'camelcase' : true,
                'curly'     : true,
                'eqeqeq'    : true,
                'forin'     : true,
                'immed'     : true,
                'indent'    : 4,
                'latedef'   : true,
                'maxerr'    : 50,
                'newcap'    : true,
                'noarg'     : true,
                'noempty'   : true,
                'nonew'     : true,
                'onevar'    : true,
                'plusplus'  : false,
                'quotmark'  : 'single',
                'regexp'    : true,
                'strict'    : true,
                'trailing'  : true,
                'undef'     : true,
                'unused'    : true,
                'white'     : false,
                'predef'    : ['jQuery']
            }
        },
        min: {
            plugins: {
                src: ['<banner>', 'build/plugins.js'],
                dest: 'plugins.min.js'
            }
        },
        watch: {
            plugins: {
                files: ['<config:coffee.plugins.src>'],
                tasks: 'concat:plugins coffee:plugins'
            }
        }
    });

    grunt.loadNpmTasks('grunt-coffee');

    grunt.registerTask('default', 'concat coffee lint min');
};
