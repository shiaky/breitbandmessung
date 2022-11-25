# Breitbandmessung.de automated

A script to enable customers of lazy ISPs to perform measurement campaigns of the connection speed as described [here](https://breitbandmessung.de/desktop-app) in an automated way.

## Usage

Create a folder for the measurement results `mkdir messprotokolle`.

Make sure you have the most recent docker image:

```
docker pull shiaky/breitbandmessung:latest
```

Then just run this for creating a single measurement:

```
docker run -v $PWD/messprotokolle:/export/ shiaky/breitbandmessung:latest
```

## License

Feel free to use and improve the script as you like. I take no responsibility for the script.
