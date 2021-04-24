import {Component, OnInit} from '@angular/core';
import * as echarts from "echarts";
import {GraphService} from "../graph.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {

  chart;
  routerPath;
  datas;
  new_datas = {};
  final_datas = []

  final_date = []
  pos_data = []
  neg_data = []
  nat_data = []


  month_list = {
    "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5",
    "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
  }
  day_list = {
    "01": "1", "02": "2", "03": "3", "04": "4",
    "05": "5", "06": "6", "07": "7", "08": "8", "09": "9",
  }

  constructor(private service: GraphService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.lineData.subscribe(data => {
      this.final_datas = []  // clean storage
      for (let j = 0; j < data.climateAU_MP_Count.length; j++) {  //  for more than one year
        this.datas = data.climateAU_MP_Count[j]
        // data format clean  change month from alpha to number and clean the day format from “0x” to "x"
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i].month = this.month_list[this.datas[i].month]
          this.datas[i].day = this.day_list.hasOwnProperty(this.datas[i].day) ? this.day_list[this.datas[i].day] : this.datas[i].day
          if (!this.new_datas.hasOwnProperty(this.datas[i].year)) {
            this.new_datas[this.datas[i].year] = {}
          }
          if (!this.new_datas[this.datas[i].year].hasOwnProperty(this.datas[i].month)) {
            this.new_datas[this.datas[i].year][this.datas[i].month] = {}
          }
          this.new_datas[this.datas[i].year][this.datas[i].month][this.datas[i].day] = {
            "pos": this.datas[i].pos,
            "neg": this.datas[i].neg,
            "nat": this.datas[i].net
          }
        }
        this.final_datas.push(this.new_datas)
        this.new_datas = {}  // clean storage
      }
      for (let i = 0; i < this.final_datas.length; i++) {
        for (let year in this.final_datas[i]) {
          for (let month in this.final_datas[i][year]) {
            const per_month = this.final_datas[i][year][month]
            for (let day in per_month) {
              this.final_date.push(month + "." + day)
              this.pos_data.push(per_month[day].pos)
              this.neg_data.push(per_month[day].neg)
              this.nat_data.push(per_month[day].nat)
            }
          }
        }
      }
      const option = this.chart.getOption()
      console.log(option)
      option.series[0].data = this.pos_data;
      option.series[1].data = this.nat_data;
      option.series[2].data = this.neg_data;
      option.xAxis[0].data = this.final_date
      this.chart.setOption(option)
    })


    this.chart = echarts.init(document.getElementById('line'));
    this.chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['positive', 'natural', 'negative']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'positive',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [0, 132, 101, 134, 90, 230, 210]
        },

        {
          name: 'natural',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'negative',
          type: 'line',
          stack: '总量',
          label: {
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    })
  }

}
