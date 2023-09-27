import {
  ComponentRef,
  Directive,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { combineLatest, EMPTY, Observable, merge, filter } from 'rxjs';

import { ErrorMsgComponent } from '../components';
import { FormItemBaseComponent } from '../../input/components/form-item-base/form-item-base.component';
import { SubscriptionDetacher } from '@utils';
import { ERROR_MSG_MAP, ErrorMsgKeys } from '../constants';
import { FormSubmitDirective } from './form-submit.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formControl], [formControlName]',
})
export class FormErrMsgDirective implements OnInit, OnDestroy {
  detacher = new SubscriptionDetacher();
  submit$: Observable<Event>;
  ref: ComponentRef<ErrorMsgComponent>;

  constructor(
    private control: NgControl,
    private form: FormSubmitDirective,
    private vcr: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;

    merge(
      this.submit$,
      combineLatest([
        (this.control.valueAccessor as FormItemBaseComponent).inFocus$,
        this.control.valueChanges,
      ]).pipe(
        filter(([isFocused, v]) => {
          if (!v && !isFocused) {
            return true;
          }

          if (isFocused) {
            this.setError(null);
            return false;
          } else {
            return v;
          }
        })
      )
    )
      .pipe(this.detacher.takeUntilDetach())
      .subscribe(() => {
        const controlErrors = this.control.errors;

        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0] as ErrorMsgKeys;
          const getError = ERROR_MSG_MAP[firstKey];
          const text = getError(controlErrors[firstKey]);
          this.setError(text);
        } else if (this.ref) {
          this.setError(null);
        }
      });
  }

  setError(text: string): void {
    if (!text) {
      this.ref?.destroy();
      this.ref = null;
      return;
    }

    if (!this.ref) {
      this.ref = this.vcr.createComponent(ErrorMsgComponent);
      this.renderer.appendChild(
        (this.vcr.element.nativeElement as HTMLElement).children[0] as HTMLDivElement,
        this.ref.location.nativeElement
      );
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy(): void {
    this.ref?.destroy();
    this.detacher.detach();
  }
}
