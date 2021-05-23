# Breitbandmessung.de automated

A script to enable customers of lazy ISPs to perform measurement campaigns of the connection speed as described [here](https://www.bundesnetzagentur.de/DE/Sachgebiete/Telekommunikation/Verbraucher/Breitbandmessung/Breitbandmessung-node.html) in an automated way.

## Usage Node

- install dependencies using `yarn install`
- perform a test using `node index.js`
- find the results in the `EXPORT_PATH` defined

## Usage Docker

- build docker image using `docker build . -t breitbandmessung`
- perform the test `docker run -v $PWD/messprotokolle:/export/ breitbandmessung`

## License

Feel free to use and improve the script as you like. I take no responsibility for the script.
