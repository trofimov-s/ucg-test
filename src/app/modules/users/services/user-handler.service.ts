import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';

import { User } from '@core/models/entities';
import { UserApiService } from '@core/services/api';

@Injectable()
export class UserHandlerService {
  private _users$ = new BehaviorSubject<User[]>(null);

  get users$(): Observable<User[]> {
    return this._users$.asObservable().pipe(filter(Boolean));
  }

  get isUsersExist(): boolean {
    return !!this._users$.getValue();
  }

  constructor(private userApiService: UserApiService) {}

  getUsers(): Observable<User[]> {
    return this.userApiService.getUsers().pipe(tap((users: User[]) => this._users$.next(users)));
  }

  getUserById(id: number): Observable<User> {
    return this.userApiService.getUserById(id);
  }

  updateUser(id: string | number, body: Partial<User>): Observable<User> {
    return this.userApiService.updateUser(id, body).pipe(
      tap((userRes: User) => {
        const updatedUsers = this._users$.getValue().map((user: User) => {
          return user.id === userRes.id ? userRes : user;
        });

        this._users$.next(updatedUsers);
      })
    );
  }

  deleteUser(id: string | number): Observable<object> {
    return this.userApiService.deleteUser(id).pipe(
      tap(() => {
        const updatedUsers = this._users$.getValue().filter((user: User) => user.id !== id);

        this._users$.next(updatedUsers);
      })
    );
  }

  createUser(body: Omit<User, 'id'>): Observable<User> {
    return this.userApiService.createUser(body).pipe(
      tap((user) => {
        const users = [...this._users$.getValue(), user];
        this._users$.next(users);
      })
    );
  }
}
