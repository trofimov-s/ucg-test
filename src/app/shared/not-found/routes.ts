import { Routes } from '@angular/router';
import { NotFoundComponent } from './components';
import { APP_ROUTES } from '@core/enums';

export const routes: Routes = [
  {
    path: APP_ROUTES.INDEX,
    component: NotFoundComponent,
  },
];
