import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from "./content/content.component";
import {GraphDisplayComponent} from "./graph-display/graph-display.component";


const routes: Routes = [
  {
    path: 'content',
    component: ContentComponent,
  },
  {
    path: 'test',
    component: GraphDisplayComponent,
  },
  {
    path: '**',
    redirectTo: 'content'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
