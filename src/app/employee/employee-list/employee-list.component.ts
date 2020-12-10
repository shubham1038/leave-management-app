import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee } from 'src/app/core/model/employee';
import { EmployeeService } from 'src/app/core/service';
import { InteractionService } from 'src/app/core/service/interaction.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public empList: any = [];
  desc: boolean = false;
  constructor(private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private interactionService: InteractionService,
    private route: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.spinner.show();
    this.employeeService.getEmployees().subscribe(
      resp => {
        this.empList = resp;
        this.spinner.hide();
      }
    )
  }

  updateUser(id: string) {
    console.log('Employee --' + JSON.stringify(id))
    this.route.navigate(['/employees/new/' + id])
  }

  sort(sortKey: string) {
    this.desc = !this.desc;
    let direction = this.desc ? 1 : -1;
    this.empList.sort(function (a, b) {
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
