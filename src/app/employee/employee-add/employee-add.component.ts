import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee } from 'src/app/core/model/employee';
import { EmployeeService } from 'src/app/core/service';
import { InteractionService } from 'src/app/core/service/interaction.service';
import { ModalService } from 'src/app/shared/service/modal-service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  public employee: Employee = new Employee();
  form: FormGroup;
  private controlContainer: ControlContainer;
  constructor(private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private modalService: ModalService,
    private interactionService: InteractionService,
    private route: Router,
    private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.router.snapshot.params) {
      let empId = this.router.snapshot.params.id;
      if (empId) {
        this.getEmpById(empId);
      }
    }

  }

  getEmpById(id: string) {
    this.employeeService.getEmployeeById(id).subscribe(resp => {
      this.employee = Object.assign({}, resp);
    });
  }
  onSubmit() {
    console.log(this.employee)
    this.spinner.show();
    this.employeeService.addUser(this.employee).subscribe(
      data => {
        this.redirectAfterSave("Employee added successfully", () => { }, "Success");
        this.spinner.hide();
        this.route.navigate(['/employees/list/'])
      }
    )
  }

  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
}
