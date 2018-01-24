import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CoreService } from '../../core.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-nav-export',
  templateUrl: './nav-export.component.html',
  styleUrls: ['./nav-export.component.css']
})
export class NavExportComponent implements OnInit {
  exportForm: FormGroup;
  minDate = moment().add(-1, 'months').toDate();
  maxDate = moment().add(-1, 'days').toDate();
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-dark-blue' });

  constructor(private _service: CoreService) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.minDate);
  }

  private createForm() {
    this.exportForm = new FormGroup({
      ExportDate: new FormControl('', Validators.required)
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
      this._service.downloadNav()
        //.subscribe(this.saveFile);
        .subscribe(res => {
          console.log(res.length);
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const fileName = 'Nav.xlsx';
          saveAs(blob, fileName);
        });
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
