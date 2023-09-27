import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './routes';
import { UserPreviewComponent, UsersComponent } from './components';
import { UserHandlerService } from './services';
import { ButtonModule } from '@shared/button';
import { TableModule } from '@shared/table';
import { InputModule } from '@shared/input';
import { IconModule } from '@shared/icon';
import { DirectiveModule } from '@shared/directive';
import { ToastModule } from '@shared/toast';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
    InputModule,
    IconModule,
    DirectiveModule,
    ToastModule,
  ],
  declarations: [UsersComponent, UserPreviewComponent],
  providers: [UserHandlerService],
})
export class UsersModule {}
