#!/bin/bash
#
# Concatinate files to a single file
#
# Copyright 2012, T. Zengerink
# Licensed under MIT License
# See: https://raw.github.com/Mytho/jquery.plugins.js/master/license.txt

DIR="$( cd "$( dirname "$0" )" && pwd)"

concat() {
	TMP="/tmp/concat.tmp"
	for FILE in `find "$1" -type f`; do
		cat "$FILE" >> "$TMP"
	done
	mv "$TMP" "$2"
}

if [ "$#" = 2 ]; then
	concat $1 $2
else
	echo -e "Usage: $0 [source-directory] [destination-file]"
fi
