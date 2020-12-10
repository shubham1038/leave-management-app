import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../model/employee';
import { catchError, retry} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  //http url
  //private baseUrl ="http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/users/";
  //Https Url
  private baseUrl ="https://shubhtech1038.xyz/fse-pm-app/api/emp/";
  
  constructor(private http: HttpClient) { }

  addUser(employee: Employee): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + 'save-emp', employee).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  getEmployeeById(empId: String): Observable<any>{
    return this.http.get(`${this.baseUrl}` +'get-emp/'+ empId)
  }

  getEmployees(): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + 'emp-list').pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error || 'Server Error')
  }
}
