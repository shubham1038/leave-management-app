import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Leave } from '../model/leave';

@Injectable()
export class LeaveRequestService {

  private baseUrl ="https://shubhtech1038.xyz/fse-pm-app/api/leave/";
  constructor(private http: HttpClient) { }

  getLeaveRequests(): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + 'leave-req-list').pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  cancelLeaveReq(id:string):Observable<any> {
    return this.http.delete(`${this.baseUrl}`+ 'cancel-leave-req/'+ id).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  getDashBoardRequests(): Observable<Object> {
    return this.http.get('https://shubhtech1038.xyz/fse-pm-app/api/dashBoard/' + 'request').pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  getDashBoardGraphRequests(): Observable<any> {
    return this.http.get('https://shubhtech1038.xyz/fse-pm-app/api/dashBoard/' + 'graph-request').pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  getGraphSummary(data: any): Observable<any> {
    return this.http.get('https://shubhtech1038.xyz/fse-pm-app/api/dashBoard/' + 'graph-summary/'+ data.series +'/'+data.name).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }
  addLeaves(leave: Leave): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + 'save-leave-req', leave).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  updateLeaves(leave: Leave): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + 'update-leave-req', leave).pipe(
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
