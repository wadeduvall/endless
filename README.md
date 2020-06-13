# endless
An open source adventure route planning webapp.

# Quick start
Assuming you have [docker-compose](https://github.com/docker/compose) installed,
first build the necessary images and start the PostGIS container.

    docker-compose build
    docker-compose up postgis 

Once the initial startup for the postgis container is done, ctr-c the
container. Now you can import from any PBF url using

    ./import.sh <URL to PBF>

Then, you can bring up the whole system:

    docker-compose up -d

