import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-graph-summary',
  templateUrl: './graph-summary.component.html',
  styleUrls: ['./graph-summary.component.css']
})
export class GraphSummaryComponent implements OnInit {

  title: string = 'Information';
  msg: any = '';
  confirmLabel: string = 'OK';
  selectedItem: any;
  confirmCallback: Function;
  desc: boolean = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  confirmClick() {
    if (this.confirmCallback) {
      this.confirmCallback(this);
    }
  }
  sort(sortKey: string) {
    this.desc = !this.desc;
    let direction = this.desc ? 1 : -1;
    this.msg.sort(function (a, b) {
      if (a[sortKey] > b[sortKey]) {
        return 1 * direction;
      } else if (a[sortKey] < b[sortKey]) {
        return -1 * direction;
      } else {
        return 0;
      }
    })
  }
  listClick(event, newValue) {
    console.log(newValue)
    this.selectedItem = newValue;
  }
}
