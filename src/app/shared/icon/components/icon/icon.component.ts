import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icon } from '../../models';

@Component({
  selector: 'app-icon',
  template: `<img [src]="'assets/icons/' + icon + '.svg'" [alt]="icon" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true })
  icon: Icon;
}
