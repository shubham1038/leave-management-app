import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardGraphComponent } from './dashboard-graph/dashboard-graph.component';
import { DashboardCalenderComponent } from './dashboard-calender/dashboard-calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from '../shared/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DashboardComponent, DashboardGraphComponent, DashboardCalenderComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SharedModule,
    MaterialModule,
    NgxChartsModule,
    DashboardRoutingModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ]
})
export class DashboardModule { }
