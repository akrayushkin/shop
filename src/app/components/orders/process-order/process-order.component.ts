import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomValidators } from '../../../validators';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  public formControl: FormGroup;
  public validationMessagesMap = new Map([
    ['firstName', {
      message: '',
      required: 'Please enter your first name',
      firstName: 'Please enter a correct name'
    }],
    ['email', {
      message: '',
      required: 'Please enter your email address',
      email: 'Please enter a valid email address'
    }],
  ])

  private sub: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formControl = this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get firstName(): AbstractControl {
    return this.formControl.get('firstName');
  }

  get email(): AbstractControl {
    return this.formControl.get('email');
  }

  get phones(): FormArray {
    return this.formControl.get('phones') as FormArray;
  }

  get selfHelp(): AbstractControl {
    return this.formControl.get('selfHelp');
  }

  get address(): AbstractControl {
    return this.formControl.get('address');
  }

  submit() {
    if (this.formControl.valid) {
      console.log("form posted");
      this.formControl.reset();
    }
  }

  setAddressValidator(selfHelp: boolean) {
    const address = this.address;
    if (selfHelp) {
      address.setValidators(Validators.required);
    } else {
      address.clearValidators();
    }
    address.updateValueAndValidity();
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhone());
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

  // перезапуск валидации контрола на событие blur
  onBlur(event) {
    const controlName = event.target.getAttribute('formControlName');
    this.setValidationMessages(controlName);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, CustomValidators.firstName]],
      secondName: '',
      email: ['', [Validators.required]],
      phones: this.formBuilder.array([this.buildPhone()]),
      selfHelp: false,
      address: ''
    })
  }

  private buildPhone(): FormControl {
    return this.formBuilder.control('');
  }

  private watchValueChanges() {
    this.sub = this.formControl.valueChanges.pipe(debounceTime(1000)).subscribe(ignorValue =>
      this.setValidationMessages()
    );
  }

  private buildValidationMessages(controlName: string) {
    // const c: AbstractControl = this.controls.get(controlName);
    const c: AbstractControl = this[controlName]; // вызов гетера
    this.validationMessagesMap.get(controlName).message = '';

    if ((c.touched || c.dirty) && c.invalid && c.errors) {
      this.validationMessagesMap.get(controlName).message = Object.keys(c.errors)
        .map(key => this.validationMessagesMap.get(controlName)[key])
        .join(' ');
    }
  }

  private setValidationMessages(controlName?: string) {
    // валидация для заданого контрола,
    // например для события blur
    if (controlName) {
      this.buildValidationMessages(controlName);
    }

    // валидация для всех контролов,
    // например при изменении чего-либо на форме
    else {
      this.validationMessagesMap.forEach((control, cntrlName) => {
        this.buildValidationMessages(cntrlName);
      });
    }
  }
}
