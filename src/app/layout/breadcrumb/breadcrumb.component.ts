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

  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        // console.log(this.activatedRoute.snapshot)
        this.routerPath = data.url.substr(1);
        this.routerSplit = this.routerPath.split('/')
        // console.log("Router方式:", this.routerPath);
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

}
