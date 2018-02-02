import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { zhCn } from 'ngx-bootstrap/locale';
import { CoreService } from '../../service/core.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-nav-export',
  templateUrl: './nav-export.component.html',
  styleUrls: ['./nav-export.component.css']
})
export class NavExportComponent implements OnInit {
  exportForm: FormGroup;
  dateRange: any = {
    start: moment().add(-1, 'months').startOf('month'),
    end: moment().add(-1, 'months').endOf('month')
  };
  pickerOptions = {
    startDate: this.dateRange.start,
    endDate: this.dateRange.end,
    minDate: moment().add(-3, 'months'),
    maxDate: moment().add(-1, 'days'),
    locale: {
      format: 'YYYY-MM-DD'
    }
  }

  constructor(private _service: CoreService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.exportForm = new FormGroup({
      ExportDate: new FormControl('', Validators.required)
    });
  }

  public selectedDate(value: any) {
    this.dateRange.start = value.start;
    this.dateRange.end = value.end;
  }

  public saveForm() {
    this._service.downloadNav({ StartDate: this.dateRange.start.format('YYYY-MM-DD'), EndDate: this.dateRange.end.format('YYYY-MM-DD')})
    .map((res) => new Blob([res['_body']], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    .subscribe(blob => {
      const fileName = `Nav_${this.dateRange.start.year() - 1911}${this.dateRange.start.format('MM')}.xlsx`;
      saveAs(blob, fileName);
    });
  }
}
