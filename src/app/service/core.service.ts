import { IDailyAccounting } from './../interface/daily-accounting.interface';
import { DailyAccounting } from '../model/daily-accounting.model';
import { WebAnalytics } from '../model/web-analytics.model';
import { MessagesService } from './messages.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  ResponseContentType
} from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, timeInterval } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class CoreService implements IDailyAccounting {
  fundDailyUrl = environment.fundDailyUrl;
  webAnalyticsUrl = environment.webAnalyticsUrl;
  navExportUrl = environment.navExportUrl;

  private store$: BehaviorSubject<DailyAccounting> = new BehaviorSubject<DailyAccounting>(new DailyAccounting());
  dailyAccounting$: Observable<DailyAccounting> = this.store$;

  constructor(private _http: Http, private _httpClient: HttpClient, private _messagesService: MessagesService) {}

  getDailyAccounting(): void {
    TimerObservable.create(0, 300000)
    .subscribe(() => {
      this._httpClient.get<DailyAccounting>(this.fundDailyUrl).subscribe(data => this.store$.next(data));
    });
  }

  downloadNav(dateRange: any): Observable<any> {
    const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    return this._http.post(
      this.navExportUrl,
      dateRange,
      new RequestOptions({
        headers: headers,
        responseType: ResponseContentType.Blob
      })
    );
  }

  getWebAnalytics(
    type: number,
    analyticsDate: string
  ): Observable<WebAnalytics> {
    const url = `${
      this.webAnalyticsUrl
    }?analyticsType=${type}&analyticsDate=${analyticsDate}`;
    return this._http
      .get(url)
      .pipe(
        tap(_ =>
          this.log(`analyticsType=${type}&analyticsDate=${analyticsDate}`)
        ),
        catchError(this.handleError<any>(`get `))
      )
      .map(res => res.json());
  }

  addWebAnalytics(data: any): Observable<any> {
    return this._http
      .post(this.webAnalyticsUrl, data)
      .pipe(
        tap(res => console.log(res.status)),
        catchError(this.handleError<any>('addWebAnalytics'))
      );
  }

  updateWebAnalytics(data: any): Observable<any> {
    return this._http
      .put(this.webAnalyticsUrl, data)
      .pipe(
        tap(res => console.log(res.status)),
        catchError(this.handleError<any>('addWebAnalytics'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this._messagesService.add('CoreService: ' + message);
  }
}
