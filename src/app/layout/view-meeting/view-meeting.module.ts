import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewMeetingRoutingModule } from './view-meeting-routing.module';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';

@NgModule({
  imports: [
    CommonModule,
    ViewMeetingRoutingModule
  ],
  declarations: [ViewMeetingComponent]
})
export class ViewMeetingModule { }
