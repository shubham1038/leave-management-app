import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveNewComponent } from './leave-new/leave-new.component';
import { LeaveRequestComponent } from './leave-request.component';


const routes: Routes = [
  {
    path:'',
    component: LeaveRequestComponent,
    children:[
        {
            path:'',
            redirectTo:'list',
            pathMatch:'full'
        },
        {
            path:'list',
            component: LeaveListComponent
        },
        {
            path:'new',
            component: LeaveNewComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRequestRoutingModule { }
