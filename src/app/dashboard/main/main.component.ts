import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IDailyAccounting } from './../../interface/daily-accounting.interface';
import { DailyAccounting, AccountingFund, Summary } from '../../model/daily-accounting.model';
import { AlertModule } from 'ngx-bootstrap';
import { Chart } from 'chart.js';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

declare var jQuery: any;
declare var moment: any;
declare var FlipClock: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dailyAccounting$: Observable<DailyAccounting> = this._service.dailyAccounting$;
  data: DailyAccounting;
  fundCount = 0;
  logCount = 0;
  lockedChart = [];
  confirmedChart = [];

  constructor(private _service: IDailyAccounting) {
  }

  ngOnInit() {
    this.dailyAccounting$.subscribe(data => {
      this.data = data;
      this.fundCount = data.FundList.length;
      this.logCount = data.SummaryList.length;

      //
      this.lockedChart = new Chart('canvas1', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [(this.fundCount - data.Locked), data.Locked],
            backgroundColor: ['', '#ffce56']
          }],
          labels: [
            '未鎖定',
            '已鎖定'
          ]
        },
        options: {
          cutoutPercentage: 50
        }
      });

      this.lockedChart = new Chart('canvas2', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [(this.fundCount - data.Confirmed), data.Confirmed],
            backgroundColor: ['', '#36a2eb']
          }],
          labels: [
            '未確認',
            '已確認'
          ]
        },
        options: {
          cutoutPercentage: 50,
          onClick: function() {
          }
        }
      });
    });
  }

}
