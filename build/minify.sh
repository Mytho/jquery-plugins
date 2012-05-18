#!/bin/bash
#
# Minify files using YUI Compressor
#
# Copyright 2012, T. Zengerink
# Licensed under MIT License
# See: https://raw.github.com/Mytho/jquery.plugins.js/master/license.txt

DIR="$( cd "$( dirname "$0" )" && pwd)"
TOOL="$DIR/tools/yuicompressor-2.4.7.jar"

minify() {
	echo -e "Minifying: $(basename "$1")"
	if [ "${1: -3}" == ".js" ]; then
		java -jar ${TOOL} -o $2 $1
	elif [ "${1: -4}" == ".css" ]; then
		java -jar ${TOOL} -o $2 $1
	fi
}

if [ "$1" = "-c" ]; then
	minify $2 $3
elif [ "$1" = "-j" ]; then
	minify $2 $3
fi
