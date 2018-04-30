import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ActivityComponent]
})
export class ActivityModule { }
