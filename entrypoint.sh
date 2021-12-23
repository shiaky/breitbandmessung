#!/bin/bash

source config.shlib;

TZ="$(config_get timezone)";
CRON_SCHEDULE="$(config_get crontab)";
RUN_ONCE="$(config_get run_once)";

echo "Setting timezone: $TZ"
rm -rf /etc/localtime
ln -s /usr/share/zoneinfo/$TZ /etc/localtime


echo "Run once: ${RUN_ONCE}"
if [ "$RUN_ONCE" = "false" ]; then
printenv | sed 's/^\(.*\)$/export \1/g' > /root/project_env.sh
echo "Setting cron schedule: ${CRON_SCHEDULE}"
echo "${CRON_SCHEDULE} /bin/bash -c '/usr/local/bin/node -r esm /usr/src/app/index.js' > /proc/1/fd/1 2>/proc/1/fd/2" | crontab -
cron -f
else
node -r esm /usr/src/app/index.js
echo "Exiting..."
exit 0
fi
