#!/bin/sh

echo "asd"

touch newFile1.txt

echo $(whoami) >> newFile2.txt

echo $(su -l mjk29 -c ls < .neededFileForProject) >> newFile2.txt