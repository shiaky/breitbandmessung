# Breitbandmessung.de automated

A script to enable customers of lazy ISPs to perform measurement campaigns of the connection speed as described [here](https://www.bundesnetzagentur.de/DE/Sachgebiete/Telekommunikation/Verbraucher/Breitbandmessung/Breitbandmessung-node.html) in an automated way.

## Usage

-   install dependencies using `yarn install`
-   rename `conf.example.js` to `conf.js`
-   adapt the variables accordingly
-   perform a test using `node index.js`

## Notes

-   the script is rating the provider with grade 6 automatically (adapt it if you like your provider)
-   the script is stating that you use a LAN connection while performing the speedtest because this is the only way you can use it to argument against your provide ... you have to ensure you are using a cable connection

## License

Feel free to use and improve the script as you like. I take no responsibility for the script.
