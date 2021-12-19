#!/bin/bash

set -e

source config.shlib;
CRON_SCHEDULE="$(config_get crontab)";


echo "Setting crontab: $CRON_SCHEDULE"
echo "${CRON_SCHEDULE} cd /usr/src/app && node index.js" | crontab -
exit 0
