import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { EqualValidator } from './user/equal-validator.directive';
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    TagInputModule,
    Ng2AutoCompleteModule
  ],
  declarations: [UserComponent, EqualValidator]
})
export class UserModule { }
