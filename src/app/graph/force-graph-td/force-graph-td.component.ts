import {Component, Input, OnInit} from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import SpriteText from "three-spritetext";


@Component({
  selector: 'app-force-graph-td',
  templateUrl: './force-graph-td.component.html',
  styleUrls: ['./force-graph-td.component.scss']
})
export class ForceGraphTDComponent implements OnInit {

  @Input() WordCloudParam;

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
  ForceGraph = ForceGraph3D(); // init graph

  highlightNodes = new Set();
  highlightLinks = new Set();
  hoverNode = null;

  constructor() {
  }

  ngOnChanges(changes): void {
    console.log(changes)
    if (changes.WordCloudParam && changes.WordCloudParam.currentValue !== undefined) {
      this.WordCloudParam = changes.WordCloudParam.currentValue
      for (let node of this.gData.nodes) {
        if (node.id === Number(this.WordCloudParam)) {
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
      .width(430)
      .height(238)
      .backgroundColor('#fff')
      .showNavInfo(false)
      .graphData(this.gData)
      .nodeThreeObjectExtend(true)
      .nodeThreeObject(node => {
        const Node: any = node;
        let text = '';
        if (Node.id.length > 10) {
          text = Node.id.substring(0, 9) + '...';
        } else {
          text = Node.id;
        }
        const sprite = new SpriteText(`${text}`);
        sprite.material.depthWrite = false;
        sprite.color = 'black';
        sprite.textHeight = 5;
        sprite.textHeight = 5;
        sprite.center.y += 1.5;
        return sprite;
      })
      .nodeColor(node => this.highlightNodes.has(node) ? node === this.hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : 'rgba(25,95,217,0.6)')
      .linkWidth(link => this.highlightLinks.has(link) ? 3 : 1)
      .linkDirectionalParticles(link => this.highlightLinks.has(link) ? 3 : 0)
      .linkDirectionalParticleWidth(4)
      .onNodeClick(node => this.clickNode(node))
  }

  search(node) {
    const distance = 100;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    this.ForceGraph.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      1500  // ms transition duration
    );
  }

  clickNode(Node) {
    // no state change
    if ((!Node && !this.highlightNodes.size) || (Node && this.hoverNode === Node)) return;
    this.highlightNodes.clear();
    this.highlightLinks.clear();
    if (Node) {
      this.highlightNodes.add(Node);
      Node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor));
      Node.links.forEach(link => this.highlightLinks.add(link));
    }

    this.hoverNode = Node || null;

    this.updateHighlight();
    this.search(Node)
  }

  updateHighlight() {
    // trigger update of highlighted objects in scene
    this.ForceGraph
      .nodeColor(this.ForceGraph.nodeColor())
      .linkWidth(this.ForceGraph.linkWidth())
      .linkDirectionalParticles(this.ForceGraph.linkDirectionalParticles());
  }
}
