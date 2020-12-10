import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Leave } from 'src/app/core/model/leave';
import { EmployeeService, LeaveRequestService } from 'src/app/core/service';
import { ModalService } from 'src/app/shared/service/modal-service';

interface LeaveType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leave-new',
  templateUrl: './leave-new.component.html',
  styleUrls: ['./leave-new.component.css']
})
export class LeaveNewComponent implements OnInit {

  public leave = new Leave();
  public modelRef: BsModalRef;
  @ViewChild("leaveForm") leaveForm;
  constructor(private employeeService: EmployeeService,
    private modalService: ModalService,
    private leaveRequestService: LeaveRequestService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.spinner.show();
    this.leaveRequestService.addLeaves(this.leave).subscribe(
      data => {
        if (data === true) {
          this.leave = new Leave();
          this.leaveForm.submitted = false;
          this.redirectAfterSave("Leave added successfully", () => { }, "Success");
          this.spinner.hide();
        } else {
          this.redirectAfterSave("You already have active leave for applied period. Please re-visit your leave and apply new leave for diffrent period", () => { }, "Error");
          this.spinner.hide();
        }

      }
    )
  }

  searchEmployee() {
    this.spinner.show();
    this.employeeService.getEmployees().subscribe(
      resp => {
        console.log(JSON.stringify(resp) + '----' + resp[0]['firstName'])
        this.modelRef = this.modalService.openSearchPopUp(resp, 'Search', (obj) => { this.selectedEmployee(obj); }, "Select")
        this.spinner.hide();
      }
    )
  }
  selectedEmployee(obj) {
    console.log(obj)
    this.modelRef.hide();
    this.leave.employee = obj.selectedItem;
  }
  leaves: LeaveType[] = [
    { value: 'Sick', viewValue: 'Sick' },
    { value: 'Casual', viewValue: 'Casual' },
    { value: 'Annual', viewValue: 'Annual' }
  ];

  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
}
