import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UserPreviewComponent, UsersComponent } from './components';
import { User } from '@core/models/entities';
import { UserHandlerService } from './services';
import { APP_ROUTES } from '@core/enums';

export const routes: Routes = [
  {
    path: APP_ROUTES.USERS,
    resolve: {
      users: (): Observable<User[]> => {
        const userHanlder = inject(UserHandlerService);

        return userHanlder.isUsersExist ? userHanlder.users$ : userHanlder.getUsers();
      },
    },
    children: [
      {
        path: APP_ROUTES.INDEX,
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserPreviewComponent,
        resolve: {
          user: (route: ActivatedRouteSnapshot): Observable<User> | Promise<boolean> => {
            const router = inject(Router);
            const userHandlerService = inject(UserHandlerService);
            const id = route.paramMap.get('id');

            if (Number(id)) {
              return userHandlerService.getUserById(+id);
            } else if (id === APP_ROUTES.NEW) {
              return null;
            } else {
              return router.navigate([APP_ROUTES.NOT_FOUND]);
            }
          },
        },
      },
    ],
  },
  {
    path: APP_ROUTES.INDEX,
    redirectTo: APP_ROUTES.USERS,
    pathMatch: 'full',
  },
];
