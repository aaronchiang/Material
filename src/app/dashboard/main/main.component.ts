import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoreService, DailyAccounting, AccountingFund, Summary } from '../../services/core.service';
import { MatTableDataSource, MatPaginator, MatPaginatorIntl, PageEvent, MatSort, Sort } from '@angular/material';
import { AlertModule } from 'ngx-bootstrap';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';
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
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) fundPaginator: MatPaginator;
  @ViewChild(MatSort) fundSort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) logPaginator: MatPaginator;
  @ViewChild(MatSort) logSort: MatSort;

  displayedFundColumns = ['FundId', 'IsLocked', 'FundName', 'Nav', 'NavDate'];
  displayedLogColumns = ['LogTime', 'Description'];
  fundDataSource = new MatTableDataSource<AccountingFund>();
  logDataSource = new MatTableDataSource<Summary>();
  data: DailyAccounting = new DailyAccounting();
  fundCount = 0;
  lockedFundCount = 0;
  confirmedFundCount = 0;
  logCount = 0;
  prevDate: any;
  clock: any;
  chart = [];

  constructor(private _service: CoreService, private matPaginatorIntl: MatPaginatorIntl) {
  }

  getDailyAccounting(): void {
    this._service.getDailyAccounting().subscribe(data => {
      this.data = data;
      this.fundDataSource.data = data.FundList;
      this.logDataSource.data = data.SummaryList;
      this.logCount = data.SummaryList.length;
      this.lockedFundCount = this.data.FundList.filter(x => x.IsLocked).length;
      this.confirmedFundCount = this.data.FundList.filter(x => x.IsConfirmed).length;

      if (this.prevDate != this.data.BaseDate) {
        this.clock = new FlipClock(jQuery('.clock'), 0, {
          clockFace: 'Counter'
        });
        this.fundCount = this.data.FundList.length;
        this.clock.setValue(this.fundCount);
        this.prevDate = this.data.BaseDate;
      }

      //
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [(this.fundCount - this.lockedFundCount), (this.lockedFundCount - this.confirmedFundCount), this.confirmedFundCount],
            backgroundColor: ['', '#ffce56', '#36a2eb']
          }],
          labels: [
            '未鎖定',
            '已鎖定',
            '已確認'
          ]
        },
        options: {
          cutoutPercentage: 50
        }
      });
    });
  }

  ngOnInit() {
    this.getDailyAccounting();
    setInterval(() => this.getDailyAccounting(), 300000);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(() => {
        this.fundDataSource.filter = (this.filter.nativeElement as HTMLInputElement).value;
      });

    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }

  ngAfterViewInit() {
    this.fundDataSource.paginator = this.fundPaginator;
    this.fundDataSource.sort = this.fundSort;
    this.logDataSource.paginator = this.logPaginator;
    this.logDataSource.sort = this.logSort;
  }
}
