import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './components';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ButtonModule } from '@shared/button';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ButtonModule],
  declarations: [NotFoundComponent],
})
export class NotFoundModule {}
