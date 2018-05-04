import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { PushNotificationRoutingModule } from './push-notification-routing.module';
import { PushNotificationComponent } from './push-notification/push-notification.component';

@NgModule({
  imports: [
    CommonModule,
    PushNotificationRoutingModule,
    TagInputModule
  ],
  declarations: [PushNotificationComponent]
})
export class PushNotificationModule { }
