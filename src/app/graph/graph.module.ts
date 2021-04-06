import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { TestComponent } from './test/test.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { GraphVisualComponent } from './graph-visual/graph-visual.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzGridModule } from 'ng-zorro-antd/grid';
import {Sum1Component} from "./sum1/sum1.component";
import {HeatMapComponent} from "./heat-map/heat-map.component";



@NgModule({
  declarations: [TestComponent, WordCloudComponent, LineGraphComponent, GraphVisualComponent,HeatMapComponent,
    Sum1Component],
  exports: [
    Sum1Component
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    NzIconModule,
    NzGridModule,
  ]
})
export class GraphModule { }
