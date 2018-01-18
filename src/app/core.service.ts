import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {

  constructor(private _http: Http) {
  }

  getDailyAccounting(): Observable<DailyAccounting> {
    return this._http.get('http://172.17.3.12/api/DailyAccounting').map(res => res.json());
  }

  downloadNav(): Observable<any> {
    return this._http.post('http://172.17.3.18/api/FundGroup/GetNav/', {
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
