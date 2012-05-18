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
	"$DIR/concat.sh" "$1" "$2"
	"$DIR/minify.sh" "$2" "$3"
}

if [ "$1" = "-c" ]; then
	build "$CSS_DIR" "$CSS_CAT" "$CSS_MIN"
elif [ "$1" = "-j" ]; then
	build "$JS_DIR" "$JS_CAT" "$JS_MIN"
else
	build "$CSS_DIR" "$CSS_CAT" "$CSS_MIN"
	build "$JS_DIR" "$JS_CAT" "$JS_MIN"
fi
