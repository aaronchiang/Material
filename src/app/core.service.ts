import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {

  constructor(private _http: Http) {
  }

  getDailyAccounting(): Observable<DailyAccounting> {
    return this._http.get('http://172.17.3.12/api/DailyAccounting').map(res => res.json());
  }

}

export class DailyAccounting {
  CurrentTime: Date;
  BaseDate: Date = new Date();
  IsNavReady: boolean = false;
  IsWork: boolean;
  Confirmed: number = 0;
  Locked: number = 0;
  Done: boolean = false;
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
