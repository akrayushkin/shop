import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+/;

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
  }]
})
export class EmailDirective implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value !== undefined && (Number.isNaN(c.value) || !emailRegexp.test(c.value))) {
      return {
        email: true
      };
    }
    return null;
  }
}
