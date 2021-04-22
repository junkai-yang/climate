import {Component, OnInit} from '@angular/core';
import {Scene, HeatmapLayer} from '@antv/l7';
import {Mapbox} from '@antv/l7-maps';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {
  scene;

  data = {
    "type": "FeatureCollection",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    "features": [
      {
        "type": "Feature",
        "properties": {"id": "ak16994521", "mag": 2.3},
        "geometry": {"type": "Point", "coordinates": [-151.5129, 63.1016, 0.0]}
      },
      {
        "type": "Feature",
        "properties": {"id": "ak16994519", "mag": 1.7},
        "geometry": {"type": "Point", "coordinates": [-150.4048, 63.1224, 105.5]}
      },
      {
        "type": "Feature",
        "properties": {"id": "ak16994517", "mag": 1.6},
        "geometry": {"type": "Point", "coordinates": [-151.3597, 63.0781, 0.0]}
      },
      {
        "type": "Feature",
        "properties": {"id": "ci38021336", "mag": 1.42},
        "geometry": {"type": "Point", "coordinates": [-118.497, 34.299667, 7.64]}
      },]
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.scene = new Scene({
      id: 'map',
      logoVisible: false,
      map: new Mapbox({
        style: 'light',
        pitch: 0,
        center: [127.5671666579043, 7.445038892195569],
        zoom: 2.632456779444394,
      })
    });
    // console.log(this.scene.getSize())
    this.scene.on('loaded', () => {
      fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
        .then(res => res.json())
        .then(data => {
          console.log(this.data)
          const layer = new HeatmapLayer({})
            .source(this.data)
            .shape('heatmap')
            .size('mag', [0, 1.0]) // weight映射通道
            .style({
              intensity: 2,
              radius: 20,
              opacity: 1.0,
              rampColors: {
                colors: [
                  '#FF4818',
                  '#F7B74A',
                  '#FFF598',
                  '#91EABC',
                  '#2EA9A1',
                  '#206C7C'
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
              }
            });
          this.scene.addLayer(layer);
        });
    });
  }
}
