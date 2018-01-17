import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatStepperIntl, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { Http } from '@angular/http';
import * as moment from 'moment';

@Component({
  selector: 'app-web-analytics',
  templateUrl: './web-analytics.component.html',
  styleUrls: ['./web-analytics.component.css']
})
export class WebAnalyticsComponent implements OnInit {
  analyticsTypeList: any[];
  today = moment();
  analyticsForm: FormGroup;

  constructor(private _http: Http) {
    this.createForm();
  }

  ngOnInit() {
    this.analyticsTypeList = [{
      id: 1,
      name: '全部'
    },
    {
      id: 2,
      name: 'ETRADE'
    },
    {
      id: 3,
      name: '手機官網'
    },
    {
      id: 4,
      name: '桌機官網'
    }];
  }

  private createForm() {
    this.analyticsForm = new FormGroup({
      AnalyticsType: new FormControl(1, Validators.required),
      AnalyticsDate: new FormControl(this.today, Validators.required),
      BrowseVolume: new FormControl(0, Validators.required),
      VisitCount: new FormControl(0, Validators.required),
      UserCount: new FormControl(0, Validators.required),
      AvgTime: new FormControl(0, Validators.required),
      StayTime: new FormControl(0, Validators.required),
      PageCount: new FormControl(0, Validators.required),
      ExitRate: new FormControl(0.00, Validators.required)
    });
  }

  public saveForm() {
    if (this.analyticsForm.valid) {
      console.log(this.analyticsForm.value);
      this._http.post('http://localhost:55196/api/BI', this.analyticsForm.value).subscribe(res => console.log(res));
      this.createForm();
    }
  }

  public clearForm() {
    this.createForm();
  }
}
