import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [
    CommonModule,
    ViewUserRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [ViewUserComponent]
})
export class ViewUserModule { }
