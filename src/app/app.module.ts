import { HttpModule } from '@angular/http';
import { CoreService } from './core.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { WebAnalyticsComponent } from './web-analytics/web-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    WebAnalyticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
