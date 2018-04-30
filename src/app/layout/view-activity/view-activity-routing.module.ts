import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewActivityComponent } from './view-activity/view-activity.component';

const routes: Routes = [
  { path : '' , component:ViewActivityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewActivityRoutingModule { }
