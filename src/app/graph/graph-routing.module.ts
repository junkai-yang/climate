import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from "./test/test.component";
import {WordCloudComponent} from "./word-cloud/word-cloud.component";
import {LineGraphComponent} from "./line-graph/line-graph.component";
import {GraphVisualComponent} from "./graph-visual/graph-visual.component";
import {Sum1Component} from "./sum1/sum1.component";
import {HeatMapComponent} from "./heat-map/heat-map.component";

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'LineGraph',
    component: GraphVisualComponent,
  },
  {
    path: 'WordCloud',
    component: WordCloudComponent,
  },
  {
    path: 'StackGraph',
    component: LineGraphComponent,
  },
  {
    path: 'HeatMap',
    component: HeatMapComponent,
  },
  {
    path: 'test5',
    component: Sum1Component,
  },
  {
    path: '**',
    redirectTo: '/home/content'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {
}
