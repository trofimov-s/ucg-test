import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  template: `<span class="form-err">{{ _err }}</span>`,
  styleUrls: ['./error-msg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMsgComponent {
  _err: string;

  @Input()
  set text(msg: string) {
    this._err = msg;
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
