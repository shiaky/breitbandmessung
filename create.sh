#!/bin/bash

chmod +x $PWD/*.sh
docker stop breitbandmessung >> /dev/null
docker rm breitbandmessung >> /dev/null
docker build . -t breitbandmessung
mkdir $PWD/messprotokolle
docker create -v $PWD/config/:/usr/src/app/config:rw -v $PWD/messprotokolle:/export/ --name "breitbandmessung" breitbandmessung:latest 
docker start breitbandmessung
