import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from "./test/test.component";
import {WordCloudComponent} from "./word-cloud/word-cloud.component";
import {LineGraphComponent} from "./line-graph/line-graph.component";

const routes: Routes = [
  {
    path: 'test',
    component: WordCloudComponent,
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
