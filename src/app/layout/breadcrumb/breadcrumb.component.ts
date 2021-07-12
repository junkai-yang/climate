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
  heatReturnDate;

  change_list = {
    "1": "01", "2": "02", "3": "03", "4": "04",
    "5": "05", "6": "06", "7": "07", "8": "08", "9": "09",
  }


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

      this.startDay = this.change_list.hasOwnProperty(this.startDay) ? this.change_list[this.startDay] : this.startDay
      this.endDay = this.change_list.hasOwnProperty(this.endDay) ? this.change_list[this.endDay] : this.endDay
      this.startMonth = this.change_list.hasOwnProperty(this.startMonth) ? this.change_list[this.startMonth] : this.startMonth
      this.endMonth = this.change_list.hasOwnProperty(this.endMonth) ? this.change_list[this.endMonth] : this.endMonth

      const startDate = this.startYear + "/" + this.startMonth + "/" + this.startDay
      const endDate = this.endYear + "/" + this.endMonth + "/" + this.endDay
      this.returnDate = [{
        "startDay": startDate,
        "endDay": endDate
      }]
      this.heatReturnDate = {
        "startDay": startDate,
        "endDay": endDate
      }
    }
    this.service.getLineGraph(this.returnDate).subscribe((data) => {
      this.service.lineData.next(data)
    })
    this.service.getMap(this.heatReturnDate).subscribe((data) => {
      this.service.heatData.next(data)
    })
  }
}


