import { Component, OnInit } from '@angular/core';
import * as echarts from "echarts";
import {GraphService} from "../graph.service";


@Component({
  selector: 'app-graph-visual',
  templateUrl: './graph-visual.component.html',
  styleUrls: ['./graph-visual.component.scss']
})
export class GraphVisualComponent implements OnInit {

  chart;

  constructor(private service:GraphService) { }

  ngOnInit(): void {
    this.chart = echarts.init(document.getElementById('visual'));
    this.chart.setOption({
      title: {
        text: 'Overlay'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['A', 'S', 'D', 'F', 'G']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'A',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'S',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'D',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'F',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'G',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    })
  }


}
