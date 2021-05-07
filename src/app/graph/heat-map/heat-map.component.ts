import {Component, OnInit} from '@angular/core';
import {Scene, HeatmapLayer} from '@antv/l7';
import {Mapbox} from '@antv/l7-maps';
import {GraphService} from "../graph.service";

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
    "features":
      []
  }

  constructor(private service: GraphService) {
  }

  ngOnInit(): void {

    this.service.getMap((
      {
        "startDay": "2020-01-01",
        "endDay": "2020-12-31"
      }
    )).subscribe((data) => {
      this.service.heatData.next(data)
    })

    this.scene = new Scene({
      id: 'map',
      logoVisible: false,
      map: new Mapbox({
        style: 'light',
        pitch: 0,
        center: [151.20203162, -33.88513759],
        zoom: 3.632456779444394,
      })
    });

    this.service.heatData.subscribe(data => {
      console.log(data)
      if (data.features !== undefined) {
        this.data.features = data.features

        const layer = new HeatmapLayer({})
          .source(this.data)
          .shape('heatmap')
          .size('compaund', [0, 1.0]) // weight映射通道
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
        this.scene.layerService.removeAllLayers()
        this.scene.addLayer(layer);
      }
    })
  }
}
