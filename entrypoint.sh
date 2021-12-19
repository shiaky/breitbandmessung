#!/bin/sh

set -e

TEMP_CONFIG="./config.json"
TZ=$(cat $TEMP_CONFIG | jq -r ".timezone")
CRON_SCHEDULE=$(cat $TEMP_CONFIG | jq -r ".cronSchedule")


echo "Setting timezone: $TZ"
ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
echo "$TZ" > /etc/timezone

echo "Exiting..."
