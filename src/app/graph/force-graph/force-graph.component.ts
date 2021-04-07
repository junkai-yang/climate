import {Component, OnInit} from '@angular/core';
import G6 from '@antv/g6';
import insertCss from 'insert-css';

@Component({
  selector: 'app-force-graph',
  templateUrl: './force-graph.component.html',
  styleUrls: ['./force-graph.component.scss']
})
export class ForceGraphComponent implements OnInit {
  tooltip;
  container;
  graph;
  constructor() {
  }

  ngOnInit(): void {
    this.container = document.getElementById('container')
    this.tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 10,
      fixToNode: [1, 0.5],
      // the types of items that allow the tooltip show up
      // 允许出现 tooltip 的 item 类型
      itemTypes: ['node', 'edge'],
      // custom the tooltip's content
      // 自定义 tooltip 内容
      getContent: (e) => {
        const outDiv = document.createElement('div');
        outDiv.style.width = 'fit-content';
        outDiv.style.height = 'fit-content';
        const model = e.item.getModel();
        if (e.item.getType() === 'node') {
          outDiv.innerHTML = `${model.name}`;
        } else {
          const source = e.item.getSource();
          const target = e.item.getTarget();
          outDiv.innerHTML = `来源：${source.getModel().name}<br/>去向：${target.getModel().name}`;
        }
        return outDiv;
      },
    });

    const width = this.container.scrollWidth || 800;
    const height = this.container.scrollHeight || 500;

    this.graph = new G6.Graph({
      container: 'container',
      width,
      height,
      layout: {
        type: 'force',
        edgeStrength: 0.7,
      },
      plugins: [this.tooltip],
      modes: {
        default: ['drag-canvas', 'activate-relations'],
      },
      defaultNode: {
        size: [10, 10],
        /* style for the keyShape */
        // style: {
        //   lineWidth: 2,
        //   fill: '#DEE9FF',
        //   stroke: '#5B8FF9',
        // },
      },
      defaultEdge: {
        /* style for the keyShape */
        style: {
          stroke: '#aaa',
          lineAppendWidth: 2,
          opacity: 0.3,
        },
      },
      /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
      // nodeStateStyles: {
      //   active: {
      //     opacity: 1,
      //   },
      //   inactive: {
      //     opacity: 0.2,
      //   },
      // },
      // edgeStateStyles: {
      //   active: {
      //     stroke: '#999',
      //   },
      // },
    });

    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
      .then((res) => res.json())
      .then((data) => {
        this.graph.data(data);
        this.graph.render();
      });

  }

}
