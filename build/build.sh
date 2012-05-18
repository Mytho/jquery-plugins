#!/bin/bash
#
# Concatinate and minify files
#
# Copyright 2012, T. Zengerink
# Licensed under MIT License
# See: https://raw.github.com/Mytho/jquery.plugins.js/master/license.txt

DIR="$( cd "$( dirname "$0" )" && pwd)"

JS_DIR="$DIR/../src"
JS_CAT="$DIR/../jquery.plugins.js"
JS_MIN="$DIR/../jquery.plugins.min.js"

CSS_DIR="$DIR/../css"
CSS_CAT="$DIR/../jquery.plugins.css"
CSS_MIN="$DIR/../jquery.plugins.min.css"

build() {
	"$DIR/concat.sh" "$1" "$2" "$3"
	"$DIR/minify.sh" "$1" "$3" "$4"
}

if [ "$1" = "-c" ]; then
	build -c "$CSS_DIR" "$CSS_CAT" "$CSS_MIN"
elif [ "$1" = "-j" ]; then
	build -j "$JS_DIR" "$JS_CAT" "$JS_MIN"
else
	build -c "$CSS_DIR" "$CSS_CAT" "$CSS_MIN"
	build -j "$JS_DIR" "$JS_CAT" "$JS_MIN"
fi
