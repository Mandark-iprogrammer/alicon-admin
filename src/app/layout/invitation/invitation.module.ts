import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvitationRoutingModule } from './invitation-routing.module';
import { InvitationComponent } from './invitation/invitation.component';

@NgModule({
  imports: [
    CommonModule,
    InvitationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [InvitationComponent]
})
export class InvitationModule { }
