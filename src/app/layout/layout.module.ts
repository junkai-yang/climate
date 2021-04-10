import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";

import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {GraphRoutingModule} from "../graph/graph-routing.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [HeaderComponent, BreadcrumbComponent],
  exports: [
    HeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzMenuModule,
    GraphRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzDatePickerModule,
    FormsModule,
  ]
})
export class LayoutModule { }
