import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { User } from '../models/entities/user.interface';
import { UserHandlerService } from '@user';

export function UniquenessAsyncValidator(
  userHandlerService: UserHandlerService,
  label: string
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> | null => {
    const value = control.value;

    return userHandlerService.getUsers().pipe(
      map((users: User[]) => {
        const usersName: string[] = users.map((user) => user.username);
        const notUnique = usersName.includes(value);

        return notUnique ? { notUnique: { field: label } } : null;
      })
    );
  };
}
