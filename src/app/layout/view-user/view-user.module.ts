import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';

@NgModule({
  imports: [
    CommonModule,
    ViewUserRoutingModule
  ],
  declarations: [ViewUserComponent]
})
export class ViewUserModule { }
