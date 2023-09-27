import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent, SelectComponent } from './components';
import { IconModule } from '@shared/icon';
import { DirectiveModule } from '@shared/directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconModule, DirectiveModule],
  declarations: [InputComponent, SelectComponent],
  exports: [InputComponent, FormsModule, ReactiveFormsModule, SelectComponent],
})
export class InputModule {}
