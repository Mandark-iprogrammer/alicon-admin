import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting/meeting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MeetingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [MeetingComponent]
})
export class MeetingModule { }
