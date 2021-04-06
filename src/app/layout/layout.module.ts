import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {GraphRoutingModule} from "../graph/graph-routing.module";

@NgModule({
  declarations: [SideBarComponent, HeaderComponent, BreadcrumbComponent],
  exports: [
    SideBarComponent,
    HeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzMenuModule,
    GraphRoutingModule,
  ]
})
export class LayoutModule { }
