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
		echo -e "Concatinating: $(basename "$FILE")"
		cat "$FILE" >> "$TMP"
	done
	mv "$TMP" "$2"
}

if [ "$1" = "-c" ]; then
	concat $2 $3
elif [ "$1" = "-j" ]; then
	concat $2 $3
fi
