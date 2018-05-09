import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting/meeting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TagInputModule } from 'ngx-chips';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { InvitationsComponent } from './invitations/invitations.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UiSwitchModule } from 'angular2-ui-switch';
import { Ng2CompleterModule } from "ng2-completer";
@NgModule({
  imports: [
    CommonModule,
    MeetingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    Ng2AutoCompleteModule,
    Ng2CompleterModule,
    TagInputModule,
    NgbModule.forRoot(),
    UiSwitchModule
  ],
  declarations: [MeetingComponent, InvitationsComponent, FileUploadComponent]
})
export class MeetingModule { }
