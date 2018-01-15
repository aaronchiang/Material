import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

//import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule/*
    DashboardRoutingModule*/
  ],
  declarations: [MainComponent]
})
export class DashboardModule { }
