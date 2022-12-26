#!/bin/bash

wget $1 -O data.osm.pbf

docker compose run --rm -e IMPORT=true -v ${PWD}/data.osm.pbf:/data/data.osm.pbf import ./import.sh

docker compose run -v ${PWD}/data.osm.pbf:/data/data.osm.pbf router 
