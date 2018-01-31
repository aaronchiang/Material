import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreService } from '../services/core.service';
import { NavExportComponent } from './nav-export/nav-export.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NavExportComponent, ToolbarComponent],
  exports: [NavExportComponent, ToolbarComponent],
  providers: [CoreService]
})
export class ComponentsModule { }
