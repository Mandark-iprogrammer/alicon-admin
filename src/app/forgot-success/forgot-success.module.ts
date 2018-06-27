import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotSuccessRoutingModule } from './forgot-success-routing.module';
import { ForgotSuccessComponent } from './forgot-success/forgot-success.component';

@NgModule({
  imports: [
    CommonModule,
    ForgotSuccessRoutingModule
  ],
  declarations: [ForgotSuccessComponent]
})
export class ForgotSuccessModule { }
