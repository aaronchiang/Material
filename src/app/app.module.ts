import { HttpModule } from '@angular/http';
import { CoreService } from './services/core.service';
import { MessagesService } from './services/messages.service';
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
    SharedModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    DashboardModule,
    ComponentsModule,
    AppRoutingModule
  ],
  providers: [CoreService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
