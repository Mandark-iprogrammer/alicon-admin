import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePwdRoutingModule } from './change-pwd-routing.module';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChangePwdRoutingModule
  ],
  declarations: [ChangePwdComponent]
})
export class ChangePwdModule { }
