import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group/group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [GroupComponent]
})
export class GroupModule { }
