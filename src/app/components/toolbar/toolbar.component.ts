import { IDailyAccounting } from './../../interface/daily-accounting.interface';
import { DailyAccounting } from './../../model/daily-accounting.model';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

declare var jQuery: any;
declare var moment: any;
declare var FlipClock: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  data: Observable<DailyAccounting> = this._service.dailyAccounting$;
  baseDate: any;
  prevDate: any;
  clock: any;
  fundCount = 0;

  constructor(private _service: IDailyAccounting) {}

  ngOnInit() {
    this._service.getDailyAccounting();
    this.data.subscribe(data => {
      if (this.prevDate != data.BaseDate) {
        this.clock = new FlipClock(jQuery('.clock'), 0, {
          clockFace: 'Counter'
        });
        this.fundCount = data.FundList.length;
        this.clock.setValue(this.fundCount);
        this.baseDate = data.BaseDate;
        this.prevDate = data.BaseDate;
      }
    });
  }
}
