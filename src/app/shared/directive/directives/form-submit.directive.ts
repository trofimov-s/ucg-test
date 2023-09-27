import { Directive, ElementRef } from '@angular/core';
import { fromEvent, shareReplay } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[form]',
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  constructor(private elRef: ElementRef<HTMLFormElement>) {}

  get element(): HTMLFormElement {
    return this.elRef.nativeElement;
  }
}
