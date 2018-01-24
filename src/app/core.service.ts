import { MessagesService } from './services/messages.service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class CoreService {
  fundDailyUrl = environment.fundDailyUrl;
  webAnalyticsUrl = 'http://localhost:55196/api/BI';

  constructor(private http: Http, private messagesService: MessagesService ) {
  }

  getDailyAccounting(): Observable<DailyAccounting> {
    return this.http.get(this.fundDailyUrl).map(res => res.json());
  }

  downloadNav(): Observable<any> {
    return this.http.post('http://172.17.3.18/api/FundGroup/GetNav/', {
      'StartDate': '2017-12-01',
      'EndDate': '2017-12-31'
    }, { responseType: ResponseContentType.Blob })
    .map(res => res.blob());
    /*
    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:53264/api/FundGroup/GetNav/', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {

                  let contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                  let blob = new Blob([xhr.response], { type: contentType });
                  observer.next(blob);
                  observer.complete();
              } else {
                  observer.error(xhr.response);
              }
          }
      };
      xhr.send();
    });*/
  }

  getWebAnalytics(type: number, analyticsDate: Date) {

  }
  addWebAnalytics(data: any): Observable<any> {
    return this.http.post(this.webAnalyticsUrl, data)
      .pipe(
        tap((res) => console.log(res.status)),
        catchError(this.handleError<any>('addWebAnalytics'))
      );
  }

  updateWebAnalytics(data: any): Observable<any> {
    return this.http.put(this.webAnalyticsUrl, data)
    .pipe(
      tap((res) => console.log(res.status)),
      catchError(this.handleError<any>('addWebAnalytics'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
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
    this.messagesService.add('HeroService: ' + message);
  }
}

export class DailyAccounting {
  CurrentTime: Date;
  BaseDate: Date = new Date();
  IsNavReady = false;
  IsWork: boolean;
  Confirmed = 0;
  Locked = 0;
  Done = false;
  FundList: Array<AccountingFund> = new Array<AccountingFund>();
  SummaryList: Array<Summary> = new Array<Summary>();
}

export class AccountingFund {
  FundId: string;
  FundName: string;
  Nav: number;
  NavDate: string;
  IsConfirmed: boolean;
  IsLocked: boolean;
}

export class Summary {
  LogTime: Date;
  Description: string;
}

export class WebAnalytics {
  AnalyticsType: number;
  AnalyticsDate: any;
  BrowseVolume: number;
  VisitCount: number;
  UserCount: number;
  AvgTime: number;
  StayTime: number;
  PageCount: number;
  ExitRate: number;
}
