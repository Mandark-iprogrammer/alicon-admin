import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AcceptUserRoutingModule } from './accept-user-routing.module';
import { AcceptUserComponent } from './accept-user/accept-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    AcceptUserRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AcceptUserComponent]
})
export class AcceptUserModule { }
