import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { AlertModule } from 'ngx-bootstrap';

import 'flipclock/compiled/flipclock';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AlertModule/*
    DashboardRoutingModule*/
  ],
  declarations: [MainComponent]
})
export class DashboardModule { }
