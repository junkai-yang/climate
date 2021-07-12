import {Component, OnInit, Output, EventEmitter} from '@angular/core';
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
    // this.service.getLineGraph(([
    //   {
    //     "startDay": "2019-01-01",
    //     "endDay": "2020-12-31"
    //   }
    // ])).subscribe((data) => {
    //   this.service.lineData.next(data)
    // })     // old version
    this.service.getInitLineData().subscribe((data) => {
      if (data.climateAU_All_Compaund !== undefined) {
        this.datas = data.climateAU_All_Compaund
        for (let i = 0; i < this.datas.length; i++) {
          const date = this.datas[i].created_at.replace('/', '.')
          this.final_date.push(date)
          this.pos_data.push(this.datas[i].positive)
          this.neg_data.push(this.datas[i].negative)
          this.nat_data.push(this.datas[i].neutral)
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
        this.msg.emit({"visible": true})
      }
    })


    this.service.lineData.subscribe(data => {
      // if (data.climateAU_MP_Count !== undefined) {
      //   this.datas = data.climateAU_MP_Count
      //   for (let i = 0; i < this.datas.length; i++) {
      //     const date = this.datas[i].year.split("_")
      //     const month = this.month_list[date[1]]
      //     const day = this.day_list.hasOwnProperty(date[2]) ? this.day_list[date[2]] : date[2]
      //     const changed_date = date[0] + "." + month + '.' + day
      //     this.final_date.push(changed_date)
      //     this.pos_data.push(this.datas[i].post)
      //     this.neg_data.push(this.datas[i].neg)
      //     this.nat_data.push(this.datas[i].net)
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
      // }
      if (data.climateAU_Choose_Compaund !== undefined && data.climateAU_Choose_Compaund.length !== 0 ) {
        this.datas = data.climateAU_Choose_Compaund
        for (let i = 0; i < this.datas.length; i++) {
          const date = this.datas[i].created_at.replace('/', '.')
          this.final_date.push(date)
          this.pos_data.push(this.datas[i].positive)
          this.neg_data.push(this.datas[i].negative)
          this.nat_data.push(this.datas[i].neutral)
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
      }  else {
        this.msg.emit({"visible": true})
      }
      // window.onresize = this.chart.resize;
      // window.addEventListener("resize",()=> (this.chart.resize()));
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
        data: ['positive', 'neutral', 'negative']
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
          name: 'neutral',
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
    setTimeout(() => {
      this.chart.resize()
    }, 4000)
    window.addEventListener("resize", () => (this.chart.resize()));
  }
}
