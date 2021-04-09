import {Component, OnInit, Input, OnChanges,} from '@angular/core';
import ForceGraph from 'force-graph';

@Component({
  selector: 'app-force-graph',
  templateUrl: './force-graph.component.html',
  styleUrls: ['./force-graph.component.scss']
})
export class ForceGraphComponent implements OnInit, OnChanges {
  @Input() WordCloudParam;
  @Input() height;
  @Input() width;

  N = 80;
  gData = {
    nodes: [...Array(this.N).keys()].map(i => ({id: i})),
    links: [...Array(this.N).keys()]
      .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id - 1))
      }))
  };

  elem;
  ForceGraph = ForceGraph(); // init graph

  NODE_R = 8;
  highlightNodes = new Set();
  highlightLinks = new Set();
  hoverNode = null;


  constructor() {
  }

  ngOnChanges(changes): void {
    console.log(changes)
    if (changes.WordCloudParam && changes.WordCloudParam.currentValue !== undefined){
      this.WordCloudParam = changes.currentValue
      for (let node of this.gData.nodes) {
        if (node.id === 1) {
          this.clickNode(node)
        }
      }
    }

  }

  ngOnInit(): void {

    this.gData.links.forEach(link => {
      const a: any = this.gData.nodes[link.source];
      const b: any = this.gData.nodes[link.target];

      !a.neighbors && (a.neighbors = []);
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b);
      b.neighbors.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    });

    this.elem = document.getElementById('container');

    this.ForceGraph(this.elem)
      .width(600)
      .height(600)
      .graphData(this.gData)
      .nodeRelSize(this.NODE_R)
      .onNodeClick(node => this.clickNode(node))
      .onLinkClick(link => {
        this.highlightNodes.clear();
        this.highlightNodes.clear();

        if (link) {
          this.highlightNodes.add(link);
          this.highlightNodes.add(link.source);
          this.highlightNodes.add(link.target);
        }
      })
      .autoPauseRedraw(false) // keep redrawing after engine has stopped
      .linkWidth(link => this.highlightNodes.has(link) ? 5 : 1)
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth(link => this.highlightNodes.has(link) ? 4 : 0)
      .nodeCanvasObjectMode(node => this.highlightNodes.has(node) ? 'before' : undefined)
      .nodeCanvasObject((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, this.NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === this.hoverNode ? 'red' : 'orange';
        ctx.fill();
      });


  }

  clickNode(Node) {
    this.highlightNodes.clear();
    this.highlightLinks.clear();
    if (Node) {
      this.highlightNodes.add(Node);
      Node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor));
      Node.links.forEach(link => this.highlightNodes.add(link));
    }

    this.hoverNode = Node || null;
    this.elem.style.cursor = Node ? '-webkit-grab' : null;
  }

}
