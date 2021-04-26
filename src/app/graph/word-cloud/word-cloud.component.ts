import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import * as echarts from 'echarts'
import 'echarts-wordcloud';
import {GraphService} from "../graph.service";

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {
  chart // create canvas
  @Output() msg = new EventEmitter()

  data;

  testData = [ { "value": 123, "name": "1" },
    { "value": 232, "name": "2" },
    { "value": 273, "name": "3" },
    { "value": 12, "name": "4" },
    { "value": 45, "name": "5" },
    { "value": 345, "name": "6" },
    { "value": 65, "name": "7" },
    { "value": 134, "name": "8" },
    { "value": 53, "name": "9" },
    { "value": 63, "name": "10" },
    { "value": 145, "name": "11" },
    { "value": 133, "name": "12" },
    { "value": 153, "name": "31" },
    { "value": 173, "name": "15" },
    { "value": 173, "name": "14" },
    { "value": 183, "name": "13" },
    { "value": 146, "name": "16" },
    { "value": 168, "name": "17" },
    { "value": 134, "name": "18" },
    { "value": 146, "name": "19" },
    { "value": 86, "name": "20" },
    { "value": 423, "name": "21" },
    { "value": 14, "name": "22" },
    { "value": 644, "name": "23" },
    { "value": 234, "name": "24" },
    { "value": 145, "name": "25" },
    { "value": 33, "name": "26" },
    { "value": 623, "name": "27" },
    { "value": 363, "name": "28" },
    { "value": 33, "name": "29" },
    { "value": 15, "name": "30" },
    { "value":43, "name": "31" },
    { "value": 133, "name": "32" },]

  constructor(private service: GraphService) {}

  ngOnInit(): void {
    this.service.getWordCloud({'num':"600"}).subscribe((data) => {
      const words = []
      // console.log(data.climateAU_MP_Count)
      for (let word of data.climateAU_MP_Count) {
        word = {"name":word._id,"value":word.value}
        words.push(word)
      }
      this.data = words

      this.chart = echarts.init(document.getElementById('main'));
      this.chart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          show: false
        },
        series: [{
          type: 'wordCloud',
          size: ['9%', '50%'],
          sizeRange: [10, 30],
          textRotation: [0, 45, 90, -45],
          rotationRange: [-45, 90],
          gridSize: 8,
          shape: 'diamond',
          drawOutOfBound: false,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            normal: {
              color: () => {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.15)'
            }
          },
          data: this.data,
        }]
      })

      this.getClickValue()

    })

  }

  getClickValue() {
    this.chart.on('click',function (word) {
      console.log(word)
      this.msg.emit({'param':word})
    }.bind(this))
  }
}
