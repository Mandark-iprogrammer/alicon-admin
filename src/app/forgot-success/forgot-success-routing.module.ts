import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotSuccessComponent } from './forgot-success/forgot-success.component';

const routes: Routes = [{
  path:'',component:ForgotSuccessComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotSuccessRoutingModule { }
