#!/bin/bash

set -e

source config.shlib;
TZ="$(config_get timezone)";


echo "Setting timezone: $TZ"
rm -rf /etc/localtime
ln -s /usr/share/zoneinfo/$TZ /etc/localtime
#echo "$TZ" > /etc/timezone

