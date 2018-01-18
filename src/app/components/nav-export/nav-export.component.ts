import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { CoreService } from '../../core.service';
import * as moment from 'moment';

@Component({
  selector: 'app-nav-export',
  templateUrl: './nav-export.component.html',
  styleUrls: ['./nav-export.component.css']
})
export class NavExportComponent implements OnInit {
  exportForm: FormGroup;
  minDate = moment().add(-1, 'months');
  maxDate = moment().add(-1, 'days');

  constructor(private _service: CoreService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.exportForm = new FormGroup({
      ExportDate: new FormControl(this.maxDate, Validators.required)
    });
  }

  private saveFile(data) {
    let blob = new Blob([(<any>data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    let url= window.URL.createObjectURL(blob);
    window.open(url);
    console.log();
  }

  public saveForm() {
    if (this.exportForm.valid) {
      console.log(this.exportForm.value);
      this._service.downloadNav()
        .subscribe(this.saveFile);
      /*
      let currentHeaders = new Headers();
      currentHeaders.append('Content-Type', 'application/json');
      currentHeaders.append('Accept', 'application/json');
      currentHeaders.append('Access-Control-Allow-Origin', 'localhost');
      this._http.post('http://172.17.3.18/api/FundGroup/GetNav/', {
        'StartDate': '2017-12-01',
        'EndDate': '2017-12-31'
      }, {
        method: 'POST',
        headers: currentHeaders,
        responseType: ResponseContentType.Blob
      }).subscribe(this.saveFile);
      this.createForm();
      */
    }
  }
}
