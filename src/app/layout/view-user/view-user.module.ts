import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { EqualValidator } from './view-user/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    ViewUserRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [ViewUserComponent,EqualValidator]
})
export class ViewUserModule { }
