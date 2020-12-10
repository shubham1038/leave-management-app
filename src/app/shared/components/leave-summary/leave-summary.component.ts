import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.css']
})
export class LeaveSummaryComponent implements OnInit {
  title: string = 'Information';
  msg: any = '';
  confirmLabel: string = 'OK';
  cancelLabel: string = 'Cancel';
  selectedItem: any;
  confirmCallback: Function;
  confirmOkCallback: Function;
  startDate: string;
  endDate: string;
  isEditable: boolean = true;
  displayAddBtn: boolean = false;

  ngOnInit(): void {
    this.startDate = this.msg.meta?.event.startDate;
    this.endDate = this.msg.meta?.event.endDate;
  }

  constructor(public bsModalRef: BsModalRef) {
    this.startDate = this.msg.meta?.event.startDate;
    this.endDate = this.msg.meta?.event.endDate;
  }

  confirmClick(event) {
    if (this.confirmCallback) {
      this.confirmCallback(this);
    }
  }

  confirmEditClick(event, clickEdit) {
    this.isEditable = false;
    this.displayAddBtn = true;
    this.startDate = this.msg.meta?.event.startDate;
    this.endDate = this.msg.meta?.event.endDate;
  }


  confirmOkClick(event, clickEdit) {
    if (this.confirmOkCallback) {
      this.confirmOkCallback(this);
    }
  }

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
  }


}
