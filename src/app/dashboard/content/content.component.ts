import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  param_WordCloud;
  // dom = document.getElementsByClassName('gutter-row')
  constructor() { }

  ngOnInit(): void {
    //
    // console.log(this.dom[0].scrollHeight)
    // console.log(this.dom)
    // console.log(this.dom[1].clientWidth)
  }

  getWordCloud(event) {
    console.log(event)
    this.param_WordCloud = event.param.name;
  }

}
