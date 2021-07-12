import {Component, OnInit} from '@angular/core';
import {GraphService} from "../../graph/graph.service";
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  param_WordCloud;
  collapse_line = true;
  collapse_word = true;
  collapse_force = true;
  collapse_map = true;

  isVisible = false;

  constructor(private service:GraphService) {
  }

  ngOnInit(): void {
    setInterval(()=>{
      const target = document.getElementsByClassName('scene-container')[0]
      const sf = <Screenfull>screenfull
      if (!sf.isFullscreen) {
        this.service.nodeSize.next({'height':287,'width':520})
      }
    },800)
  }

  getWordCloud(event) {
    // console.log(event)
    this.param_WordCloud = event.param.name;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  getLineGraphVisible(event) {
    console.log(event)
    this.isVisible = event.visible
  }

  changeSize(event) {
    event.stopPropagation()
    this.service.nodeSize.next({'height':document.documentElement.scrollHeight,'width':document.documentElement.scrollWidth})
    const target = document.getElementsByClassName('scene-container')[0];
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled) {
      sf.request(target);
    }
  }

}
