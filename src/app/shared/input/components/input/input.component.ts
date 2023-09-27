import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MakeProvider } from '@utils';
import { FormItemBaseComponent } from '../form-item-base/form-item-base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MakeProvider(InputComponent)],
})
export class InputComponent extends FormItemBaseComponent {}
