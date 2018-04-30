import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';

const routes: Routes = [
  {path: '',component:ViewMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewMeetingRoutingModule { }
