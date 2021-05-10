import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import * as echarts from "echarts";
import {GraphService} from "../graph.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {

  @Output() msg = new EventEmitter()
  chart;
  routerPath;
  datas;
  // new_datas = {};  // old vision
  // final_datas = [] // old vision

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
  selectedBacklogType: any;
  setTheHeight: any;

  constructor(private service: GraphService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.getLineGraph(([
      {
        "startDay": "2019-01-01",
        "endDay": "2020-12-31"
      }
    ])).subscribe((data) => {
      this.service.lineData.next(data)
    })


    // this.service.lineData.subscribe(data => {
    //   this.final_datas = []  // clean storage
    //   for (let j = 0; j < data.climateAU_MP_Count.length; j++) {  //  for more than one year
    //     this.datas = data.climateAU_MP_Count[j]
    //     // data format clean  change month from alpha to number and clean the day format from “0x” to "x"
    //     for (let i = 0; i < this.datas.length; i++) {
    //       this.datas[i].month = this.month_list[this.datas[i].month]
    //       this.datas[i].day = this.day_list.hasOwnProperty(this.datas[i].day) ? this.day_list[this.datas[i].day] : this.datas[i].day
    //       if (!this.new_datas.hasOwnProperty(this.datas[i].year)) {
    //         this.new_datas[this.datas[i].year] = {}
    //       }
    //       if (!this.new_datas[this.datas[i].year].hasOwnProperty(this.datas[i].month)) {
    //         this.new_datas[this.datas[i].year][this.datas[i].month] = {}
    //       }
    //       this.new_datas[this.datas[i].year][this.datas[i].month][this.datas[i].day] = {
    //         "pos": this.datas[i].pos,
    //         "neg": this.datas[i].neg,
    //         "nat": this.datas[i].net
    //       }
    //     }
    //     this.final_datas.push(this.new_datas)
    //     this.new_datas = {}  // clean storage
    //   }
    //   for (let i = 0; i < this.final_datas.length; i++) {
    //     for (let year in this.final_datas[i]) {
    //       for (let month in this.final_datas[i][year]) {
    //         const per_month = this.final_datas[i][year][month]
    //         for (let day in per_month) {
    //           this.final_date.push(month + "." + day)
    //           this.pos_data.push(per_month[day].pos)
    //           this.neg_data.push(per_month[day].neg)
    //           this.nat_data.push(per_month[day].nat)
    //         }
    //       }
    //     }
    //   }
    //   const option = this.chart.getOption()
    //
    //   option.series[0].data = this.pos_data;
    //   option.series[1].data = this.nat_data;
    //   option.series[2].data = this.neg_data;
    //   option.xAxis[0].data = this.final_date
    //
    //   this.chart.setOption(option)
    //   this.pos_data = []
    //   this.nat_data = []
    //   this.neg_data = []
    //   this.final_date = []
    // })

    this.service.lineData.subscribe(data => {
      if (data.climateAU_MP_Count !== undefined) {
        this.datas = data.climateAU_MP_Count
        for (let i = 0; i < this.datas.length; i++) {
          const date = this.datas[i].year.split("_")
          const month = this.month_list[date[1]]
          const day = this.day_list.hasOwnProperty(date[2]) ? this.day_list[date[2]] : date[2]
          const changed_date = date[0] + "." + month + '.' + day
          this.final_date.push(changed_date)
          this.pos_data.push(this.datas[i].post)
          this.neg_data.push(this.datas[i].neg)
          this.nat_data.push(this.datas[i].net)
        }
        const option = this.chart.getOption()

        option.series[0].data = this.pos_data;
        option.series[1].data = this.nat_data;
        option.series[2].data = this.neg_data;
        option.xAxis[0].data = this.final_date

        this.chart.setOption(option)
        this.pos_data = []
        this.nat_data = []
        this.neg_data = []
        this.final_date = []
      } else {
        this.msg.emit({"visible":true})
      }
      // window.onresize = this.chart.resize;
      window.addEventListener("resize",()=> (this.chart.resize()));
    })



    this.chart = echarts.init(document.getElementById('line'));

    this.chart.setOption({
      toolbox: {
        show: true,
        itemGap: 5,
        top: -5,
        feature: {
          dataView: {
            show: false,
          },
          dataZoom: {
            show: true,
            iconStyle: {
              opacity: 0,
            },
          },
          restore: { show: false },
          saveAsImage: { show: false },
          // 全屏具体实现
          myFull: {
            show: true,
            title: '全屏查看',
            icon: `/assets/images/full.jpg`,
            onclick: (e) => {
              const element = document.getElementById(e.option.value);
              if (element.requestFullscreen) { // HTML W3C 提议
                element.requestFullscreen();
              }
              // 退出全屏
              if (element.requestFullscreen) {
                document.exitFullscreen();
              }
            },
          },
        },
      },
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
          data: []
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
          data: []
        },

        {
          name: 'natural',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: []
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
          data: []
        }
      ]
    })

  }
}
