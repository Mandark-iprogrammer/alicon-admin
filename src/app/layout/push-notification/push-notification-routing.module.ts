import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PushNotificationComponent } from './push-notification/push-notification.component';

const routes: Routes = [
  { path : '' ,component:PushNotificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushNotificationRoutingModule { }
