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
	if [ "${1: -3}" == ".js" ]; then
		java -jar ${TOOL} -o $2 $1
	elif [ "${1: -4}" == ".css" ]; then
		java -jar ${TOOL} -o $2 $1
	fi
}

if [ "$#" = 2 ]; then
	minify $1 $2
else
	echo -e "Usage: $0 [source-file] [destination-file]"
fi
