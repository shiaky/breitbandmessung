# Breitbandmessung.de automated

A script to enable customers of lazy ISPs to perform measurement campaigns of the connection speed as described [here](https://www.bundesnetzagentur.de/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Breitband/Breitbandmessung/Breitbandmessung-node.html) in an automated way.

## Usage

Create a folder for the measurement results `mkdir messprotokolle`.

Then just run:

```
docker run -v $PWD/messprotokolle:/export/ shiaky/breitbandmessung:latest
```

## License

Feel free to use and improve the script as you like. I take no responsibility for the script.
