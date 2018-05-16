import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ViewMeetingRoutingModule } from './view-meeting-routing.module';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { UiSwitchModule } from 'angular2-ui-switch';
import { Ng2CompleterModule } from "ng2-completer";
import { FileSelectDirective,
  FileDropDirective,FileUploader } from 'ng2-file-upload';


@NgModule({
  imports: [
    CommonModule,
    ViewMeetingRoutingModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    Ng2AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    UiSwitchModule
  ],
  declarations: [ViewMeetingComponent]
})
export class ViewMeetingModule { }
