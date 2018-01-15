import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService, DailyAccounting, AccountingFund } from '../../core.service';
import { MatTableDataSource, MatPaginator, PageEvent, MatSort, Sort } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

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
  fundDataCount = 0;

  data: DailyAccounting = new DailyAccounting();

  constructor(private _service: CoreService) {
  }

  getDailyAccounting(): void {
    this._service.getDailyAccounting().subscribe(daily => {
      this.fundDataSource.data = daily.FundList;
      this.fundDataSource.sort = this.sort;
      this.fundDataCount = daily.FundList.length;
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
