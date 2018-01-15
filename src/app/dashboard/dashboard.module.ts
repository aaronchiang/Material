import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';

//import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule/*
    DashboardRoutingModule*/
  ],
  declarations: [MainComponent]
})
export class DashboardModule { }
