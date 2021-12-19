#!/bin/bash

source config.shlib;
CRONTAB="$(config_get crontab)";


echo "Setting crontab: $CRONTAB"
#echo "${CRON_SCHEDULE} docker start breitbandmessung" | crontab -

docker build . -t breitbandmessung
mkdir $PWD/messprotokolle
docker run -v $PWD/messprotokolle:/export/ --name "breitbandmessung" breitbandmessung:latest
exit 0
