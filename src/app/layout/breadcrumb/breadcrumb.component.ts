import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  routerPath: string = "";
  routerSplit;
  dateFormat = 'yyyy/MM/dd';
  date;



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        this.routerPath = data.url.substr(1) === "" ? "home/content" : data.url.substr(1);
        this.routerSplit = this.routerPath.split('/')
        console.log("Router方式:", this.routerPath);
        let graphs:any = JSON.parse(localStorage.getItem('ContainGraph')) || {'Graph':[]}
        // console.log(graphs)
        if (this.routerSplit[0] === 'home') {
          // console.log(graphs)
          if (graphs.Graph === [] || graphs.Graph.indexOf(this.routerSplit[1]) == -1){
            graphs.Graph.push(this.routerSplit[1])
            console.log(graphs)
            localStorage.setItem('ContainGraph',JSON.stringify(graphs))
          }
        }

      }
    })
  }

  clear() {
    localStorage.removeItem('ContainGraph')
  }



  emitDate() {
    if (this.date){
      const date = {
        'start': this.date[0],
        'end': this.date[1]
      }
      console.log(date)
    }

  }

}
