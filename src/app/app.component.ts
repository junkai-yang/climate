import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'climate';
  isCollapsed = false;

  collapsed (event) {
    this.isCollapsed = event.collapsed
  }
}

