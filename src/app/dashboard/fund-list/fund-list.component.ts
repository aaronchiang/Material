import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DailyAccounting, AccountingFund } from '../../model/daily-accounting.model';
import { IDailyAccounting } from '../../interface/daily-accounting.interface';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css']
})
export class FundListComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  dailyAccounting$: Observable<DailyAccounting> = this._service.dailyAccounting$;
  dataSource = new MatTableDataSource<AccountingFund>();
  displayedColumns = ['FundId', 'IsLocked', 'FundName', 'Nav', 'NavDate'];
  count = 0;

  constructor(private _service: IDailyAccounting) {
  }

  ngOnInit() {
    this.dailyAccounting$.subscribe(data => {
      this.dataSource.data = data.FundList;
      this.count = data.FundList.length;
    });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe(() => {
      this.dataSource.filter = (this.filter.nativeElement as HTMLInputElement).value;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
