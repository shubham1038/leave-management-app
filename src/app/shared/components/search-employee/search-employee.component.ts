import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  title: string = 'Information';
  msg: string = '';
  confirmLabel: string = 'OK';
  selectedItem: any;
  confirmCallback: Function;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  constructor(public bsModalRef: BsModalRef) { }

  confirmClick() {
    if (this.confirmCallback) {
      this.confirmCallback(this);
    }
  }

  listClick(event, newValue) {
    console.log(newValue)
    this.selectedItem = newValue;
  }

}
