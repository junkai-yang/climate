import {Component, OnInit} from '@angular/core';
import {GraphService} from "../graph.service";
import * as echarts from 'echarts'
import 'echarts-wordcloud';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  chart // create canvas

  constructor(private service: GraphService) {
  }

  ngOnInit(): void {

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
        data: [
          { "value": 123, "name": "张继科换 情侣  头像" },
          { "value": 124, "name": "何猷君 文物 上 涂鸦" },
          { "value": 126, "name": "微信 520元 红包" },
          { "value": 122, "name": "谷歌  停止  华为  合作" },
          { "value": 121, "name": "男子 验 出月 经 推迟" },
          { "value": 122, "name": "江苏  校园 反杀案" },
          { "value": 132, "name": "圆通  速递  猥亵  客户" },
          { "value": 112, "name": "日本  偶遇  梁朝 伟" },
          { "value": 114, "name": "梅西获金靴" },
          { "value": 132, "name": "哈文生" },
          { "value": 88, "name": "姜潮" },
          { "value": 99, "name": "何猷君" },
          { "value": 132, "name": "男婴" },
          { "value": 134, "name": "杭州" },
          { "value": 122, "name": "合照" },
          { "value": 66, "name": "赵帅" },
          { "value": 98, "name": "杭州" },
          { "value": 99, "name": "成都" },
          { "value": 96, "name": "张紫妍案 调查结果" },
          { "value": 204, "name": "A股爱囤房" },
          { "value": 231, "name": "     部分  合作" },
          { "value": 123, "name": "刘士余案" },
          { "value": 123, "name": "酒后玻璃" },
          { "value": 124, "name": "首都 备降" },
          { "value": 123, "name": "靓号被使用" },
          { "value": 111, "name": "施瓦辛格踹" },
          { "value": 112, "name": "联想  造谣者  道歉" },
          { "value": 114, "name": "埃及  巴士  炸弹  袭击" },
          { "value": 116, "name": "高三  女孩 弃考 救母" },
          { "value": 165, "name": "郑姝音遭 争议 判罚" },
          { "value": 147, "name": "长沙 公交 连撞  10 车" },
          { "value": 134, "name": "散步  晕倒  男婴  被盗" },
          { "value": 132, "name": "松原  5.1 级 地震" },
          { "value": 143, "name": "印第安纳州  枪击案" },
          { "value": 156, "name": "苏志 燮赵 恩情  恋情" }
        ],
      }]
    })
    this.getClickValue()
  }

  getClickValue() {
    this.chart.on('click',function (word) {
      console.log(word.data.name.trim())
    })
  }
}
