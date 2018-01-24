import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {
  fundDailyUrl = environment.fundDailyUrl;
  navExportUrl = environment.navExportUrl;

  constructor(private _http: Http) {
  }

  getDailyAccounting(): Observable<DailyAccounting> {
    return this._http.get(this.fundDailyUrl).map(res => res.json());
  }

  downloadNav(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
    let options = new RequestOptions({ headers: headers,
      responseType: ResponseContentType.ArrayBuffer });
    return this._http.post(this.navExportUrl, {
      'StartDate': '2017-12-01',
      'EndDate': '2017-12-31'
    }, options);
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
