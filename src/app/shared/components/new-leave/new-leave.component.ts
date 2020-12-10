import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Leave } from 'src/app/core/model/leave';
import { EmployeeService } from 'src/app/core/service';
import { ModalService } from '../../service/modal-service';

interface LeaveType {
  value: string;
  viewValue: string;
}
interface Employee {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-new-leave',
  templateUrl: './new-leave.component.html',
  styleUrls: ['./new-leave.component.css']
})

export class NewLeaveComponent implements OnInit {
  
  public leave = new Leave();
  title: string = 'Information';
  msg: any = '';
  confirmLabel: string = 'OK';
  cancelLabel: string = 'Cancel';
  confirmCallback: Function;
  public modelRef1: BsModalRef;
  leavesList: LeaveType[] = [
    { value: 'Sick', viewValue: 'Sick' },
    { value: 'Casual', viewValue: 'Casual' },
    { value: 'Annual', viewValue: 'Annual' }
  ];
 
  employeeList: any = [
  ];
  constructor(public bsModalRef: BsModalRef,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      resp => {
        this.employeeList = resp;
      }
    )
  }
  onSubmit() {
  }

  confirmOkClick(event, clickEdit) {
    if (this.confirmCallback) {
      this.confirmCallback(this);
    }
  }
  
}
