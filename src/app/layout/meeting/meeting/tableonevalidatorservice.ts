
import { FormControl,FormGroup, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class TableOneValidatorService{
    getFormGroup(): FormGroup {
        // here define and return the FormGroup with the FormControl(s) loaded.
        return new FormGroup({
          'value': new FormControl(
            null,
            [
              Validators.required,
              // Custom validators could be used here.
            ],
            null)
      });
    }
}