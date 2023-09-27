import { Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { Icon } from '@shared/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form-item-base',
  template: '',
})
export class FormItemBaseComponent<T = string> implements ControlValueAccessor, OnDestroy {
  inFocus$ = new BehaviorSubject(false);

  @Input()
  parentForm: FormGroup;

  @Input()
  id: string;

  @Input()
  required: boolean;

  @Input()
  fieldName: string;

  @Input()
  label: string;

  @Input()
  type = 'text';

  @Input()
  icon: Icon;

  toggleFocus(inFocus: boolean): void {
    this.inFocus$.next(inFocus);
  }

  value: T;
  changed: (value: T) => void;
  touched: () => void;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  onChanged(event: Event): void {
    this.value = (<HTMLInputElement | HTMLSelectElement>event.target).value as T;
    this.changed(this.value);
  }

  ngOnDestroy(): void {
    this.inFocus$.next(null);
    this.inFocus$.complete();
  }
}
