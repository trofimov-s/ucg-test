import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApiService } from './base-api';
import { User } from '@core/models/entities';
import { Endpoints } from '@core/models/api';

@Injectable({ providedIn: 'root' })
export class UserApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.buildUrl((e: Endpoints) => e.users));
  }

  getUserById(id: string | number): Observable<User> {
    return this.http.get<User>(`${this.buildUrl((e: Endpoints) => e.users)}/${id}`);
  }

  updateUser(id: string | number, body: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.buildUrl((e: Endpoints) => e.users)}/${id}`, body);
  }

  deleteUser(id: string | number): Observable<object> {
    return this.http.delete<object>(`${this.buildUrl((e: Endpoints) => e.users)}/${id}`);
  }
}
