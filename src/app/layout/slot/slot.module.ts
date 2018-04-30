import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotRoutingModule } from './slot-routing.module';
import { SlotComponent } from './slot/slot.component';

@NgModule({
  imports: [
    CommonModule,
    SlotRoutingModule
  ],
  declarations: [SlotComponent]
})
export class SlotModule { }
