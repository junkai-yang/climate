import {Component, Input, OnInit} from '@angular/core';
import ForceGraph3D from '3d-force-graph';
import SpriteText from "three-spritetext";
import {GraphService} from "../graph.service";
import {EventManager} from "@angular/platform-browser";


@Component({
  selector: 'app-force-graph-td',
  templateUrl: './force-graph-td.component.html',
  styleUrls: ['./force-graph-td.component.scss']
})
export class ForceGraphTDComponent implements OnInit {

  @Input() WordCloudParam;

  elem;
  ForceGraph = ForceGraph3D(); // init graph

  data = {'nodes': [], 'links': []};

  highlightNodes = new Set();
  highlightLinks = new Set();
  hoverNode = null;

  constructor(private service: GraphService,
              private eventManager: EventManager) {
  }

  ngOnChanges(changes): void {
    console.log(changes)
    if (changes.WordCloudParam && changes.WordCloudParam.currentValue !== undefined) {
      this.WordCloudParam = changes.WordCloudParam.currentValue
      for (let node of this.data.nodes) {
        if (node.id === this.WordCloudParam) {
          this.clickNode(node)
        }
      }
    }

  }

  ngOnInit(): void {


    this.service.nodeSize.subscribe((data) => {
      this.ForceGraph.width(data.width)
      this.ForceGraph.height(data.height)
    })

    this.service.getNode({"num": 3}).subscribe((data) => {
      this.data['nodes'] = data.climateAU_edge_Count[0].nodes
      this.data['links'] = data.climateAU_edge_Count[1].links
      console.log(this.data)


      this.elem = document.getElementById('container');

      this.ForceGraph(this.elem)
        .width(520)
        .height(287)
        .backgroundColor('#fff')
        .showNavInfo(false)
        .graphData(this.data)
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
        .nodeColor(node => this.highlightNodes.has(node.id) ? node === this.hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : 'rgba(25,95,217,0.6)')
        .linkWidth(link => {
          const Link: any = link
          if (this.highlightLinks.has(Link.id)) {
            return 3
          } else {
            return 1
          }
        })
        .linkDirectionalParticles(link => {
          const Link: any = link
          if (this.highlightLinks.has(Link.id)) {
            return 3
          } else {
            return 0
          }
        })
        .linkDirectionalParticleWidth(4)
        .onNodeClick(node => this.clickNode(node))
    })
    this.service.nodeSize.subscribe((data) => {
      this.ForceGraph
        .width(data.width)
        .height(data.height)
    })
  }


  search(node) {
    const distance = 100;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    this.ForceGraph.cameraPosition(
      {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
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
      this.highlightNodes.add(Node.id);
      if (Node.hasOwnProperty('neighbors')) {
        for (let i = 0; i < Node.neighbors.length; i++) {
          Node.neighbors[i].forEach(neighbor => this.highlightNodes.add(neighbor));
        }
      }
    }

    this.hoverNode = Node || null;

    this.updateHighlight();
    this.search(Node)
  }

  updateHighlight() {
    this.ForceGraph
      .nodeColor(this.ForceGraph.nodeColor())
      .linkWidth(this.ForceGraph.linkWidth())
      .linkDirectionalParticles(this.ForceGraph.linkDirectionalParticles());
  }
}
