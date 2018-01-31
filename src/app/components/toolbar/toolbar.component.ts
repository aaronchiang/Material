import { CoreService, DailyAccounting } from './../../services/core.service';
import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var moment: any;
declare var FlipClock: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  data: DailyAccounting = new DailyAccounting();
  prevDate: any;
  clock: any;
  fundCount = 0;

  constructor(private _service: CoreService) { }

  getDailyAccounting(): void {
    this._service.getDailyAccounting().subscribe(data => {
      this.data = data;
      if (this.prevDate != this.data.BaseDate) {
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

}
