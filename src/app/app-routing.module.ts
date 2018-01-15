import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './dashboard/main/main.component';
import { WebAnalyticsComponent } from './web-analytics/web-analytics.component';

const routes: Routes = [
  { path: 'dashboard', component: MainComponent },
  { path: 'webanalytics', component: WebAnalyticsComponent },
  { path: '*', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
