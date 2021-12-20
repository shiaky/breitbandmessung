# Breitbandmessung.de automated

A script to enable customers of lazy ISPs to perform measurement campaigns of the connection speed as described [here](https://www.bundesnetzagentur.de/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Breitband/Breitbandmessung/start.html) in an automated way.

## Usage

Edit config.cfg and enter your local timezone and crontab configuration.

For the cronjob you can use [this website](https://crontab-generator.org/).
By default the measurement runs every 2 hours.

Timezone name from [this list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List).
The default timezone is UTC.


Just run:

```
git clone https://github.com/shneezin/breitbandmessung.git && cd breitbandmessung
chmod +x create.sh
sudo ./create.sh
```

## License

Feel free to use and improve the script as you like. I take no responsibility for the script.
