import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormErrMsgDirective, FormSubmitDirective } from './directives';
import { ErrorMsgComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [FormErrMsgDirective, ErrorMsgComponent, FormSubmitDirective],
  exports: [FormErrMsgDirective, FormSubmitDirective],
  providers: [FormSubmitDirective],
})
export class DirectiveModule {}
