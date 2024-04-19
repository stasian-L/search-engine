import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkipLoading } from '../../@core/intercepters/loading.interceptor';
import { User, UserAPIResponse } from '../interfaces/user.interface';

export type LoginBodyRequest = Pick<User, 'email'> & { password: string };

export type RegisterBodyRequest = Pick<User, 'email' | 'username'> & {
    password: string;
};

export type UpdateCurrentUserBodyRequest = Pick<User, 'email' | 'username' | 'bio' | 'image'> & { password: string };

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(user: LoginBodyRequest): Observable<UserAPIResponse> {
        return this.http.post<UserAPIResponse>('users/login', { user });
    }

    register(user: RegisterBodyRequest): Observable<UserAPIResponse> {
        return this.http.post<UserAPIResponse>('users', { user });
    }

    getCurrentUser(): Observable<UserAPIResponse> {
        return this.http.get<UserAPIResponse>('user', {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    updateCurrentUser(user: UpdateCurrentUserBodyRequest): Observable<UserAPIResponse> {
        return this.http.put<UserAPIResponse>('user', { user });
    }

    refreshToken(): Observable<unknown> {
        return this.http.get<unknown>(`auth/refresh`);
    }
}
