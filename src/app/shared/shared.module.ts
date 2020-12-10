import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsModalService } from 'ngx-bootstrap/modal';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { ModalService } from './service/modal-service';
import { ConfirmOkComponent } from './components/confirm-ok/confirm-ok.component';
import { LeaveSummaryComponent } from './components/leave-summary/leave-summary.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { NewLeaveComponent } from './components/new-leave/new-leave.component';
import { MaterialModule } from '../shared/material/material.module';
import {MatSelectModule} from '@angular/material/select';
import { GraphSummaryComponent } from './components/graph-summary/graph-summary.component';
import { StringToDatedisplayPipe } from './pipes/stringtodate.pipe';

@NgModule({
  declarations: [SearchEmployeeComponent, ConfirmOkComponent, LeaveSummaryComponent, NewLeaveComponent, GraphSummaryComponent, StringToDatedisplayPipe],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    
  ],
   entryComponents:[
    SearchEmployeeComponent,
    ConfirmOkComponent,
    LeaveSummaryComponent,
    NewLeaveComponent
  ],
  exports:[
    SearchEmployeeComponent,
    ConfirmOkComponent,
    LeaveSummaryComponent,
    NewLeaveComponent,
    StringToDatedisplayPipe
  ],
  providers: [ModalService,BsModalService]
})
export class SharedModule { }
