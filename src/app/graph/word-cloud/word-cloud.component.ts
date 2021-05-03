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

  constructor(private service: GraphService) {}

  ngOnInit(): void {
    this.service.getWordCloud({'num':"20"}).subscribe((data) => {
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
