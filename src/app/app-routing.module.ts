import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './core/enums/routes/app-routes.enum';

const routes: Routes = [
  {
    path: APP_ROUTES.INDEX,
    loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
    title: 'Users',
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    loadChildren: () => import('./shared/not-found/not-found.module').then((m) => m.NotFoundModule),
    title: 'Not Found',
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.NOT_FOUND,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
