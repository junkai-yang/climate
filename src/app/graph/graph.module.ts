import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GraphRoutingModule} from './graph-routing.module';
import {TestComponent} from './test/test.component';
import {WordCloudComponent} from './word-cloud/word-cloud.component';
import {LineGraphComponent} from './line-graph/line-graph.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzGridModule} from 'ng-zorro-antd/grid';
import {Sum1Component} from "./sum1/sum1.component";
import {HeatMapComponent} from "./heat-map/heat-map.component";
import {ForceGraphComponent} from './force-graph/force-graph.component';
import {FormsModule} from "@angular/forms";
import {NzCollapseModule} from "ng-zorro-antd/collapse";


@NgModule({
  declarations: [TestComponent, WordCloudComponent, LineGraphComponent, HeatMapComponent,
    Sum1Component, ForceGraphComponent],
  exports: [
    Sum1Component,
    ForceGraphComponent,
    LineGraphComponent,
    HeatMapComponent,
    WordCloudComponent
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    NzIconModule,
    NzGridModule,
    FormsModule,
    NzCollapseModule,
  ]
})
export class GraphModule {
}
