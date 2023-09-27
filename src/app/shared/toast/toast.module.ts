import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastHostComponent } from './components';
import { ToastHanlderService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastHostComponent],
  providers: [ToastHanlderService],
})
export class ToastModule {}
