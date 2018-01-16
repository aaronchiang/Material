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
  analyticsForm: FormGroup;

  constructor() {
    this.analyticsForm = new FormGroup({
      analyticsDate: new FormControl('', Validators.required),
      browseVolume: new FormControl('', Validators.required),
      visitCount: new FormControl('', Validators.required),
      userCount: new FormControl('', Validators.required),
      avgTime: new FormControl('', Validators.required),
      stayTime: new FormControl('', Validators.required),
      pageCount: new FormControl('', Validators.required),
      exitRate: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

}
