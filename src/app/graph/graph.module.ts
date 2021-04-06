import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { TestComponent } from './test/test.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { LineGraphComponent } from './line-graph/line-graph.component';


@NgModule({
  declarations: [TestComponent, WordCloudComponent, LineGraphComponent],
  imports: [
    CommonModule,
    GraphRoutingModule
  ]
})
export class GraphModule { }
