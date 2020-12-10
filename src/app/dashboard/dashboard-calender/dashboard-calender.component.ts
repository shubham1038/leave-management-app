import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Observable, Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { LeaveRequestService } from 'src/app/core/service';
import { endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns/esm';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/core/model/event';
import { ModalService } from 'src/app/shared/service/modal-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { InteractionService } from 'src/app/core/service/interaction.service';
import { Leave } from 'src/app/core/model/leave';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-dashboard-calender',
  templateUrl: './dashboard-calender.component.html',
  styleUrls: ['./dashboard-calender.component.css']
})
export class DashboardCalenderComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];
  CalendarView = CalendarView;
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  public modelRef: BsModalRef;
  events$: Observable<Array<CalendarEvent<{ events: Event }>>>;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-plus-square fa-spin fa-lg"></i>',
      a11yLabel: 'Add',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Add', event);
      },
    },
  ];
  constructor(private leaveRequestService: LeaveRequestService,
    private modalService: ModalService,
    private spinner: NgxSpinnerService,
    private interactionService: InteractionService) { }
  loadCalenderEvents(): void {
    const getStart: any = { month: startOfMonth, week: startOfWeek, day: startOfDay }[this.view];
    const getEnd: any = { month: endOfMonth, week: endOfWeek, day: endOfDay }[this.view];
    //const date1 = format(getStart(this.viewDate), 'YYYY-MM-DD');
    // const date2 = format(getEnd(this.viewDate), 'YYYY-MM-DD');

    this.events$ = this.leaveRequestService.getDashBoardRequests()
      .pipe(
        map((results: any) => {
          return results.map((event: Event) => {
            return {
              actions: this.actions,
              title: event.title,
              start: startOfDay(new Date(event.startDate)),
              end: endOfDay(new Date(event.endDate)),
              allDay: true,
              color: event.eventType === 'Sick' ? { primary: '#e21841' } : { primary: this.getRandomColor() },
              meta: {
                event
              }
            };
          });
        }));
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.modelRef = this.modalService.openNewLeaveReqPopUp(event, 'New Leave Request',
        (obj) => { this.leaveAddEvent(obj); }, "OK")
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      
    }
  }
  ngOnInit(): void {
    this.loadCalenderEvents();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    if(action === 'Add'){
      this.modelRef = this.modalService.openNewLeaveReqPopUp(event, 'New Leave Request',
      (obj) => { this.leaveAddEvent(obj); }, "OK")
    }else{
      this.modelRef = this.modalService.openLeavePopUp(event, 'Leave Summary', (obj) => { this.leaveCancelEvent(obj); },
      (obj) => { this.leaveEditEvent(obj); }, "Edit", "Cancel Leave")
    }
    
  }

  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }

  leaveCancelEvent(obj) {
    this.spinner.show();
    this.cancelLeave(obj.msg.meta?.event.reqId);
  }

  leaveEditEvent(obj) {
    this.updateLeave(obj);
  }

  leaveAddEvent(obj) {
    console.log(obj)
    this.addLeave(obj.leave)
  }

  addLeave(leaveObj: any) {
    this.modelRef.hide();
    this.spinner.show();


    this.leaveRequestService.addLeaves(leaveObj).subscribe(resp => {
      if (resp === true) {
        this.loadCalenderEvents();
        this.activeDayIsOpen = false;
        this.interactionService.refreshGraph();
        this.redirectAfterSave("Leave added successfully", () => { }, "Success");
        this.spinner.hide();
      } else {
        this.redirectAfterSave("You already have active leave for applied period. Please re-visit your leaves", () => { }, "Error");
        this.spinner.hide();
      }
    })
  }

  updateLeave(leaveObj: any) {
    this.modelRef.hide();
    this.spinner.show();
    let leave = new Leave();
    leave.reqId = leaveObj.msg.meta?.event.reqId;
    leave.startDate = leaveObj.startDate;
    leave.endDate = leaveObj.endDate;

    this.leaveRequestService.updateLeaves(leave).subscribe(resp => {
      if (resp === true) {
        this.loadCalenderEvents();
        this.activeDayIsOpen = false;
        this.interactionService.refreshGraph();
        this.redirectAfterSave("Leave updated successfully", () => { }, "Success");
        this.spinner.hide();
      } else {
        this.redirectAfterSave("You already have active leave for applied period. Please re-visit your leaves", () => { }, "Error");
        this.spinner.hide();
      }
    })
  }

  cancelLeave(reqId: string) {
    this.modelRef.hide();
    this.spinner.show();
    this.leaveRequestService.cancelLeaveReq(reqId).subscribe(resp => {
      this.loadCalenderEvents();
      this.activeDayIsOpen = false;
      this.interactionService.refreshGraph();
      this.redirectAfterSave("Leave Cancelled successfully", () => { }, "Success");
      this.spinner.hide();
    })
  }
}
