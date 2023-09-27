import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  role: 'primary' | 'warn' = 'primary';

  @Input({ required: true })
  text: string;

  @Input()
  type: 'button' | 'reset' | 'submit' = 'button';
}
