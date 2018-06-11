import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptUserComponent } from './accept-user/accept-user.component';

const routes: Routes = [{
  path:'',component:AcceptUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptUserRoutingModule { }
