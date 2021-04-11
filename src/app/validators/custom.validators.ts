import { AbstractControl, ValidationErrors } from '@angular/forms';

const nameRegexp = /^[a-zA-Zа-яА-Я]{2,}$/;

export class CustomValidators {
  static firstName(c: AbstractControl): ValidationErrors | null {
    if (c.value !== undefined && (Number.isNaN(c.value) || !nameRegexp.test((c.value).trim()))) {
      return {
        firstName: true
      };
    }
    return null;
  }
}
