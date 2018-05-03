import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ViewMeetingRoutingModule } from './view-meeting-routing.module';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';

@NgModule({
  imports: [
    CommonModule,
    ViewMeetingRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [ViewMeetingComponent]
})
export class ViewMeetingModule { }
