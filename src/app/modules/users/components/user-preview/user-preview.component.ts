import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '@core/models/entities';
import { UserHandlerService } from '../../services';
import { Router } from '@angular/router';
import { APP_ROUTES, UserRole } from 'src/app/core/enums';
import { UniquenessAsyncValidator, ValuesEquivalenceValidator } from '@core/validation';
import { ToastHanlderService } from '@shared/toast';

interface UserForm {
  username: FormControl<string>;
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  email: FormControl<string>;
  type: FormControl<string>;
  password: FormControl<string>;
  repeat_password: FormControl<string>;
}

type UserFormValue = {
  [key in keyof UserForm]: string;
};

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent implements OnInit {
  @Input()
  user: User;

  typeOptions: string[] = Object.values(UserRole);
  isEditMode: boolean;
  userForm: FormGroup<UserForm>;

  get title(): string {
    return this.isEditMode ? `${this.user?.first_name} ${this.user?.last_name}` : 'Create new user';
  }

  constructor(
    private userHandlerService: UserHandlerService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastHanlder: ToastHanlderService
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.isEditMode = true;
    }
    this.initForm();
  }

  async submit(): Promise<void> {
    if (this.userForm.invalid) {
      this.makeFormControlsDirty(this.userForm);
      return;
    }

    const newUser = this.mapFormToUser(this.userForm.value as UserFormValue);

    let action;
    if (this.isEditMode) {
      action = this.userHandlerService.updateUser(this.user.id, newUser);
    } else {
      action = this.userHandlerService.createUser(newUser);
    }

    action.subscribe({
      next: () => {
        this.toastHanlder.addToast({
          msg: this.isEditMode ? 'User data successfully edited' : 'User successfully created',
          type: 'success',
        });
        this.closeHanlder();
      },
      error: () => {
        this.toastHanlder.addToast({ msg: 'Something went wrong...', type: 'warn' });
      },
    });
  }

  closeHanlder(): void {
    this.router.navigate([APP_ROUTES.USERS]);
  }

  deleteUser(): void {
    this.userHandlerService.deleteUser(this.user.id).subscribe(() => {
      this.toastHanlder.addToast({ msg: 'User successfully deleted', type: 'success' });
      this.closeHanlder();
    });
  }

  private mapFormToUser(formValue: UserFormValue): Omit<User, 'id'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeat_password, type, ...rest } = formValue;

    return { ...rest, user_type: type } as User;
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl(
        this.isEditMode ? this.user.username : null,
        [Validators.required],
        this.isEditMode ? [] : [UniquenessAsyncValidator(this.userHandlerService, 'Username')]
      ),
      first_name: new FormControl(this.isEditMode ? this.user.first_name : null, [
        Validators.required,
      ]),
      last_name: new FormControl(this.isEditMode ? this.user.last_name : null, [
        Validators.required,
      ]),
      email: new FormControl(this.isEditMode ? this.user.email : '', [
        Validators.required,
        Validators.email,
      ]),
      type: new FormControl(this.isEditMode ? this.user.user_type : '', [Validators.required]),
      password: new FormControl(this.isEditMode ? this.user.password : null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z]).{1,}'),
      ]),
      repeat_password: new FormControl(this.isEditMode ? this.user.password : null, [
        Validators.required,
        // custom validator Equivalent
        ValuesEquivalenceValidator('password', 'Password'),
      ]),
    });

    this.cdr.detectChanges();
  }

  private makeFormControlsDirty(form: FormGroup): void {
    Object.keys(form.controls).forEach((key: string) => form.get(key).markAsDirty());
  }
}
