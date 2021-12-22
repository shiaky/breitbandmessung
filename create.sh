#!/bin/bash

chmod +x $PWD/*.sh
docker stop breitbandmessung >> /dev/null
docker rm breitbandmessung >> /dev/null
docker build . -t breitbandmessung
mkdir $PWD/config
mkdir $PWD/messprotokolle
chmod 777 $PWD/messprotokolle
docker create -v $PWD/config/:/usr/src/app/config:rw -v $PWD/messprotokolle:/export/ --name "breitbandmessung" breitbandmessung:latest 
#docker update --restart unless-stopped breitbandmessung
docker start breitbandmessung
