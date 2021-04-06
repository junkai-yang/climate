import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from "./test/test.component";
import {WordCloudComponent} from "./word-cloud/word-cloud.component";
import {LineGraphComponent} from "./line-graph/line-graph.component";
import {GraphVisualComponent} from "./graph-visual/graph-visual.component";

const routes: Routes = [
  {
    path: 'test',
    component: LineGraphComponent,
  },
  {
    path: 'test2',
    component: WordCloudComponent,
  },
  {
    path: 'test3',
    component: GraphVisualComponent,
  },
  {
    path: '**',
    redirectTo: 'test'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {
}
