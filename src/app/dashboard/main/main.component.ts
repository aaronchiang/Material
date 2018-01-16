import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService, DailyAccounting, AccountingFund } from '../../core.service';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedHeadColumns = ['FundId', 'FundName', 'Nav'];
  displayedRowColumns = ['FundId', 'FundName', 'Nav'];
  fundDataSource = new MatTableDataSource<AccountingFund>();
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
    this.fundDataSource.paginator = this.paginator;
    this.fundDataSource.sort = this.sort;
  }
}
