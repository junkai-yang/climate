import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {ContentComponent} from './content/content.component';
import {GraphDisplayComponent} from './graph-display/graph-display.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzGridModule} from "ng-zorro-antd/grid";
import {GraphModule} from "../graph/graph.module";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [ContentComponent, GraphDisplayComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule,
    NzGridModule,
    GraphModule,
    NzCollapseModule,
    NzModalModule,
    NzButtonModule,
  ]
})

export class DashboardModule {
}
