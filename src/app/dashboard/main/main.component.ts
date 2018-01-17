import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService, DailyAccounting, AccountingFund, Summary } from '../../core.service';
import { MatTableDataSource, MatPaginator, PageEvent, MatSort, Sort } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

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
  @ViewChild(MatPaginator) logPaginator: MatPaginator;
  @ViewChild(MatSort) logSort: MatSort;

  displayedFundColumns = ['FundId', 'IsLocked', 'FundName', 'Nav', 'NavDate'];
  displayedLogColumns = ['LogTime', 'Description'];
  fundDataSource = new MatTableDataSource<AccountingFund>();
  logDataSource = new MatTableDataSource<Summary>();
  dayLabel: any;
  data: DailyAccounting = new DailyAccounting();
  fundCount = 0;
  prevDate: any;
  clock: any;

  constructor(private _service: CoreService) {
  }

  getDailyAccounting(): void {
    this._service.getDailyAccounting().subscribe(data => {
      this.data = data;
      this.fundDataSource.data = data.FundList;
      this.logDataSource.data = data.SummaryList;

      if (this.prevDate != this.data.BaseDate) {
        console.log(this.dayLabel);
        this.clock = new FlipClock(jQuery('.clock'), 0, {
          clockFace: 'Counter'
        });
        this.fundCount = this.data.FundList.length;
        this.clock.setValue(this.fundCount);
        this.prevDate = this.data.BaseDate;
      }
    });
  }

  ngOnInit() {
    this.getDailyAccounting();
  }

  ngAfterViewInit() {
    this.fundDataSource.paginator = this.fundPaginator;
    this.fundDataSource.sort = this.fundSort;
    this.logDataSource.paginator = this.logPaginator;
    this.logDataSource.sort = this.logSort;
  }
}
