import React from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat, toLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './react-geo.css';

import {
  MapComponent
} from '@terrestris/react-geo';

const layer = new LayerTile({
  source: new XYZSource({
    url: 'http://192.168.1.64/tile/{z}/{x}/{y}.png'
  })
});

const vectorSource = new VectorSource();

const vectorLayer = new VectorLayer({
  source: vectorSource
});

const center = fromLonLat([-77.1878, 38.8646])

const map = new Map({
  view: new View({
    center: center,
    zoom: 16,
  }),
  layers: [
    layer,
    vectorLayer,
  ]
});

map.on('click', function(evt) {
  const feature = new Feature({
    type: 'Point',
    geometry: new Point(evt.coordinate)
  });
  vectorSource.addFeature(feature);
  // if features > 2, query the router
  const features = vectorSource.getFeatures();
  if (features.length > 1) {
    const clickCoords = features.filter(ftr => {
      return ftr.get('type') == 'Point';
    }).map(ftr => {
      return toLonLat(ftr.getGeometry().getCoordinates());
    });
    const request = clickCoords.map(pos => {
      return pos[0].toString() + ',' + pos[1];
    }).join(';');
    fetch('//192.168.1.64/route/v1/walking/' + request).then(
      r => {
        return r.json();
      }).then(json => {
      const polyline = json.routes[0].geometry;
      const route = new Polyline().readGeometry(polyline, {
        dataProjetion: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });
      const feature = new Feature({
        type: 'LineString',
        geometry: route
      });
      vectorSource.addFeature(feature);
    });
  }
});

function App() {
  return (
    <div className="App">
      <MapComponent
        map={map}
      />
    </div>
  );
}

export default App;
