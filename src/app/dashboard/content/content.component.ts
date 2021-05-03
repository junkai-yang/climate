import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  param_WordCloud;
  collapse_line = true
  collapse_word = true
  collapse_force = true
  collapse_map = true

  isVisible = false;

  constructor() { }

  ngOnInit(): void {

  }

  getWordCloud(event) {
    // console.log(event)
    this.param_WordCloud = event.param.name;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  getLineGraphVisible(event){
    // console.log(event)
    this.isVisible = event.visible
  }

}
