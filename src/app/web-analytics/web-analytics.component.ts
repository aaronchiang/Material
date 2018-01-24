import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatStepperIntl, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { CoreService } from '../core.service';
import { AlertModule, ModalModule } from 'ngx-bootstrap';
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
  minDate = moment().add(-1, 'years');
  maxDate = moment();
  success: boolean;
  exceptions: boolean;
  errorMessage = '';

  constructor(private _service: CoreService) {
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
      this.success = false;
      this.exceptions = false;

      this._service.addWebAnalytics(this.analyticsForm.value).subscribe((res) => {
        console.log(res);
        /*
        switch (res.status) {
            case 200:
              this.success = true;
              break;
            case 409:
              //break;
            default:
              this.exceptions = true;
              this.errorMessage = res.statusText;
              break;
          }
        */
      });
      this.createForm();
    }
  }

  public clearForm() {
    this.createForm();
  }
}
