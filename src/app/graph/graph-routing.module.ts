import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from "./test/test.component";
import {WordCloudComponent} from "./word-cloud/word-cloud.component";
import {LineGraphComponent} from "./line-graph/line-graph.component";
import {Sum1Component} from "./sum1/sum1.component";
import {HeatMapComponent} from "./heat-map/heat-map.component";
import {ForceGraphComponent} from "./force-graph/force-graph.component";
import {ForceGraphTDComponent} from "./force-graph-td/force-graph-td.component";

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'NodeGraph',
    component: ForceGraphComponent,
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
    path:'3d',
    component:ForceGraphTDComponent
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
