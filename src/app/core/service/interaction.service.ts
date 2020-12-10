import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../model/employee';
import { Leave } from '../model/leave';

@Injectable()
export class InteractionService {

  private _empObject = new Subject<Employee>()
  employee$ = this._empObject.asObservable();

  private _grapphObject = new Subject<Leave>()
  grapph$ = this._grapphObject.asObservable();

  constructor() { }

  updateEmployee(emp : Employee){
    this._empObject.next(emp);
  }

  refreshGraph(){
    this._grapphObject.next();
  }
}
