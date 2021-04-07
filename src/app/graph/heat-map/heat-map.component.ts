import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import {GraphService} from "../graph.service";

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {

  chart

  constructor(private service: GraphService) { }

  ngOnInit(): void {
    this.chart = echarts.init(document.getElementById('heat'));
    this.chart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }]
    });
  }
  click() {
    console.log('click')
  }
}



