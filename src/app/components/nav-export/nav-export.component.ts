import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { Http } from '@angular/http';
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

  constructor(private _http: Http) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.exportForm = new FormGroup({
      ExportDate: new FormControl(this.maxDate, Validators.required)
    });
  }
}
