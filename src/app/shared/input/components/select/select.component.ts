import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FormItemBaseComponent } from '../form-item-base/form-item-base.component';
import { MakeProvider } from '@utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MakeProvider(SelectComponent)],
})
export class SelectComponent extends FormItemBaseComponent {
  @Input()
  options: string[];
}
