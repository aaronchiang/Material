import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatStepperIntl, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
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

  constructor() {
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
      analyticsType: new FormControl(1, Validators.required),
      analyticsDate: new FormControl(this.today, Validators.required),
      browseVolume: new FormControl(0, Validators.required),
      visitCount: new FormControl(0, Validators.required),
      userCount: new FormControl(0, Validators.required),
      avgTime: new FormControl(0, Validators.required),
      stayTime: new FormControl(0, Validators.required),
      pageCount: new FormControl(0, Validators.required),
      exitRate: new FormControl(0.00, Validators.required)
    });
  }

  public saveForm() {
    if (this.analyticsForm.valid) {
      console.log(this.analyticsForm.value);
      this.createForm();
    }
  }

  public clearForm() {
    this.createForm();
  }
}
