import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LineGraphComponent} from "../line-graph/line-graph.component";
declare var BMap: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('testContainer', {read: ViewContainerRef}) container;
  componentRef: ComponentRef<LineGraphComponent>;


  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }
}
