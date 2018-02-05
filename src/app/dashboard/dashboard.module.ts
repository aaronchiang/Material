import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { AlertModule } from 'ngx-bootstrap';

import 'flipclock/compiled/flipclock';
import { FundListComponent } from './fund-list/fund-list.component';
import { LogListComponent } from './log-list/log-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AlertModule/*
    DashboardRoutingModule*/
  ],
  declarations: [MainComponent, FundListComponent, LogListComponent]
})
export class DashboardModule { }
