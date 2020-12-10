import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveNewComponent } from './leave-new/leave-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LeaveListComponent, LeaveNewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LeaveRequestRoutingModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class LeaveRequestModule { }
