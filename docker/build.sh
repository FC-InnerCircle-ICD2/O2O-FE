#!/bin/bash
FILE_PATH=$(dirname $(realpath -s $0))
docker build -t o2o-fe -f $FILE_PATH/Dockerfile $FILE_PATH/..
 