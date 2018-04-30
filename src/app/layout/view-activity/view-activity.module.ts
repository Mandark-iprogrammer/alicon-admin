import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewActivityRoutingModule } from './view-activity-routing.module';
import { ViewActivityComponent } from './view-activity/view-activity.component';

@NgModule({
  imports: [
    CommonModule,
    ViewActivityRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [ViewActivityComponent]
})
export class ViewActivityModule { }
