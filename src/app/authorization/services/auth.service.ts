import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SkipLoading } from '../../@core/intercepters/loading.interceptor';
import { User, UserAPIResponse } from '../interfaces/user.interface';

type Role = 'USER' | 'ADMIN';

type GrantType = 'password' | 'refresh_token';

export type LoginBodyRequest = Pick<User, 'username'> & { password: string; grant_type: GrantType };
export type RefreshTokenBodyRequest = Pick<User, 'refresh_token'> & { client_id: 'gigy'; client_secret: 'secret'; grant_type: GrantType };

export type RegisterBodyRequest = Pick<User, 'firstName' | 'lastName' | 'email'> & {
    password: string;
    role: Role;
};

export type UpdateUserBodyRequest = Omit<User, 'access_token' | 'refresh_token'>;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);

    login(user: LoginBodyRequest): Observable<UserAPIResponse> {
        const body = `grant_type=${user.grant_type}&username=${user.username}&password=${user.password}`;
        return this.http.post<UserAPIResponse>('oauth/token', body, {
            headers: {
                Authorization: 'Basic Z2lneTpzZWNyZXQ=',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    register(user: RegisterBodyRequest): Observable<any> {
        return this.http.post<any>('register', user, {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    refreshToken(user: RefreshTokenBodyRequest): Observable<UserAPIResponse> {
        const body = `grant_type=${user.grant_type}&client_id=${user.client_id}&client_secret=${user.client_secret}&refresh_token=${user.refresh_token}`;
        return this.http.post<UserAPIResponse>('oauth/token', body, {
            headers: {
                Authorization: 'Basic Z2lneTpzZWNyZXQ=',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>('user', {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    updateUser(user: UpdateUserBodyRequest): Observable<User> {
        return this.http.put<User>('user', user, {
            context: new HttpContext().set(SkipLoading, true)
        });
    }
}
