import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { User } from '@core/models/entities';
import { UserHandlerService } from '../../services';
import { TableProps } from '@shared/table';
import { Router } from '@angular/router';
import { APP_ROUTES, UserRole } from 'src/app/core/enums';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  tableProps: TableProps<User>[] = [
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'first_name',
      label: 'First name',
    },
    {
      key: 'last_name',
      label: 'Last name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'user_type',
      label: 'Type',
    },
  ];

  constructor(
    private userHandler: UserHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.userHandler.users$.pipe(
      map((users) =>
        users.map((user) =>
          user.user_type === UserRole.Admin
            ? { ...user, user_type: 'Administrator' as UserRole }
            : user
        )
      )
    );
  }

  rowClickHandler(user: User): void {
    this.router.navigate([APP_ROUTES.USERS, user.id]);
  }

  createUserHanlder(): void {
    this.router.navigate([APP_ROUTES.USERS, APP_ROUTES.NEW]);
  }
}
