import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { IDailyAccounting } from '../../interface/daily-accounting.interface';
import { DailyAccounting, Summary } from '../../model/daily-accounting.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: Array<Summary>;

  dailyAccounting$: Observable<DailyAccounting> = this._service.dailyAccounting$;
  dataSource = new MatTableDataSource<Summary>();
  displayedColumns = ['LogTime', 'Description'];
  count = 0;

  constructor(private _service: IDailyAccounting) { }

  ngOnInit() {
    this.dailyAccounting$.subscribe(data => {
      this.dataSource.data = data.SummaryList;
      this.count = data.SummaryList.length;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
