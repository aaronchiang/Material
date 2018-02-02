import { IDailyAccounting } from './interface/daily-accounting.interface';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CoreService } from './service/core.service';
import { MessagesService } from './service/messages.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebAnalyticsComponent } from './web-analytics/web-analytics.component';
import { AlertModule, BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    WebAnalyticsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    DashboardModule,
    ComponentsModule,
    AppRoutingModule
  ],
  providers: [
    CoreService,
    MessagesService,
    {provide: IDailyAccounting, useExisting: CoreService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
