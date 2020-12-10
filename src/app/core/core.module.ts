import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService, LeaveRequestService } from './service';
import { InteractionService } from './service/interaction.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers :[
    EmployeeService,
    LeaveRequestService,
    InteractionService
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
        throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
    }
}

static forRoot(): ModuleWithProviders {
    return {
        ngModule: CoreModule,
        providers: [
          EmployeeService
        ]
    }
}
}
