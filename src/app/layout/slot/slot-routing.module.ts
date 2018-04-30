import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlotComponent } from './slot/slot.component';

const routes: Routes = [
  {path:'',component:SlotComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotRoutingModule { }
