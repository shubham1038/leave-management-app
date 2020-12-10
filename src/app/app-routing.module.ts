import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'dashboard'
  },
  {
    path:'employees',
    loadChildren: ()=> import('./employee/employee.module').then(v => v.EmployeeModule)
  },
  {
    path:'leave',
    loadChildren: ()=> import('./leave-request/leave-request.module').then(v => v.LeaveRequestModule)
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then(v => v.DashboardModule)
  },
  {
    path:'**',
    redirectTo:'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
