#!/bin/bash
/usr/src/app/timezone.sh

source config/config.shlib;

TZ="$(config_get timezone)";
CRON_SCHEDULE="$(config_get crontab)";

echo "Setting timezone: $TZ"
rm -rf /etc/localtime
ln -s /usr/share/zoneinfo/$TZ /etc/localtime


printenv | sed 's/^\(.*\)$/export \1/g' > /root/project_env.sh
echo "${CRON_SCHEDULE} . /root/project_env.sh && cd /usr/src/app && flock -n /var/lock/messung.lock node /usr/src/app/index.js && rm /var/lock/messung.lock > /proc/1/fd/1 2>/proc/1/fd/2" | crontab -
cron -f

echo "Exiting..."
