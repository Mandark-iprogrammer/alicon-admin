import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotAdminComponent } from './forgot-admin/forgot-admin.component';

const routes: Routes = [
  {path:'',component:ForgotAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotAdminRoutingModule { }
