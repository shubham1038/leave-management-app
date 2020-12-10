import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaveRequestService } from 'src/app/core/service';
import { ModalService } from 'src/app/shared/service/modal-service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {

  public leaveList: any = [];
  desc: boolean = false;
  constructor(private leaveRequestService: LeaveRequestService,
    private modalService: ModalService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getLeaveRequest();
  }

  sort(sortKey: string) {
    this.desc = !this.desc;
    let direction = this.desc ? 1 : -1;
    if (sortKey === 'firstName') {
      this.leaveList.sort(function (a, b) {
        if (a.employee[sortKey] > b.employee[sortKey]) {
          return 1 * direction;
        } else if (a.employee[sortKey] < b.employee[sortKey]) {
          return -1 * direction;
        } else {
          return 0;
        }
      })
    } else {
      this.leaveList.sort(function (a, b) {
        if (a[sortKey] > b[sortKey]) {
          return 1 * direction;
        } else if (a[sortKey] < b[sortKey]) {
          return -1 * direction;
        } else {
          return 0;
        }
      })
    }
  }

  getLeaveRequest() {
    this.spinner.show();
    this.leaveRequestService.getLeaveRequests().subscribe(
      resp => {
        this.leaveList = resp;
        this.spinner.hide();
      }
    )
  }

  cancelLeave(reqId: string) {
    this.spinner.show();
    console.log('Req ID -' + reqId)
    this.leaveRequestService.cancelLeaveReq(reqId).subscribe(resp => {
      this.getLeaveRequest();
      this.redirectAfterSave("Leave Cancelled successfully", () => { }, "Success");
      this.spinner.hide();
    })
  }

  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }

}
