import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() msg = new EventEmitter
  isCollapsed = false;
  constructor() {

  }

  ngOnInit(): void {
  }

  clickCollapsed() {
    this.isCollapsed = !this.isCollapsed
    this.msg.emit({'collapsed':this.isCollapsed})
  }
}
