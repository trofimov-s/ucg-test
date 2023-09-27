import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValuesEquivalenceValidator(controlName: string, label: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueForCompare = control.parent?.value?.[controlName];

    if (!valueForCompare) {
      return null;
    }

    return valueForCompare !== control.value ? { notEquivalent: { compareField: label } } : null;
  };
}
