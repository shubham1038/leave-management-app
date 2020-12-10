import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-ok',
  templateUrl: './confirm-ok.component.html',
  styleUrls: ['./confirm-ok.component.css']
})
export class ConfirmOkComponent implements OnInit {
  title: string = 'Information';
  msg: string = '';

  confirmLabel: string = 'OK';
  confirmCallback: Function;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  confirmClick() {
    if (this.confirmCallback) {
      this.confirmCallback()
    }
  }
}
