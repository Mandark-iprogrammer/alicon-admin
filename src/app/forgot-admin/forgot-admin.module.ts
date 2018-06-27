import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotAdminRoutingModule } from './forgot-admin-routing.module';
import { ForgotAdminComponent } from './forgot-admin/forgot-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ForgotAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotAdminComponent]
})
export class ForgotAdminModule { }
