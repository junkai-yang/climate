import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {GraphService} from "../../graph/graph.service";

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

  start;
  end;
  startYear;
  startMonth;
  startDay;
  endYear;
  endMonth;
  endDay;
  returnDate;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: GraphService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        this.routerPath = data.url.substr(1) === "" ? "home/content" : data.url.substr(1);
        this.routerSplit = this.routerPath.split('/')
        console.log("Router方式:", this.routerPath);
        let graphs: any = JSON.parse(localStorage.getItem('ContainGraph')) || {'Graph': []}
        // console.log(graphs)
        if (this.routerSplit[0] === 'home') {
          // console.log(graphs)
          if (graphs.Graph === [] || graphs.Graph.indexOf(this.routerSplit[1]) == -1) {
            graphs.Graph.push(this.routerSplit[1])
            console.log(graphs)
            localStorage.setItem('ContainGraph', JSON.stringify(graphs))
          }
        }

      }
    })
  }

  clear() {
    localStorage.removeItem('ContainGraph')
  }


  emitDate() {
    if (this.date) {
      this.start = this.date[0]
      this.end = this.date[1]
      this.startYear = this.start.getFullYear()
      this.startMonth = this.start.getMonth() + 1
      this.startDay = this.start.getDate()
      this.endYear = this.end.getFullYear()
      this.endMonth = this.end.getMonth() + 1
      this.endDay = this.end.getDate()
      // console.log(typeof this.endDay)
      if (this.endYear - this.startYear > 0) {    // more than 1 year
        for (let i = 0; i < this.endYear - this.startYear + 1; i++) {
          if (this.startYear + i === this.startYear) {  // is start year
            this.returnDate = [{
              "year": this.startYear,
              "s_d": this.startDay,
              "s_m": this.startMonth,
              "e_d": 31,
              "e_m": 12
            }]
          } else if (this.startYear + i === this.endYear) { // is end year
            this.returnDate.push({
              "year": this.endYear,
              "s_d": 1,
              "s_m": 1,
              "e_d": this.endDay,
              "e_m": this.endMonth
            })
          } else {    // is mid year
            this.returnDate.push({
              "year": this.startYear + i,
              "s_d": 1,
              "s_m": 1,
              "e_d": 31,
              "e_m": 12
            })
          }
        }
      } else {  // same year
        this.returnDate = [{
          "year": this.startYear,
          "s_d": this.startDay,
          "s_m": this.startMonth,
          "e_d": this.endDay,
          "e_m": this.endMonth
        }]
      }
    }
    this.service.getLineGraph(
    //   [{
    //   "e_d": "31",
    //   "e_m": "12",
    //   "s_d": "1",
    //   "s_m": "6",
    //   "year": "2020"
    // },{
    //     "e_d": "1",
    //     "e_m": "3",
    //     "s_d": "1",
    //     "s_m": "1",
    //     "year": "2021"
    //   }]
      this.returnDate
    ).subscribe((data) => {
      // console.log(data)
      this.service.lineData.next(data)
    })
  }
}

