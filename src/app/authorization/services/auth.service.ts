import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserAPIResponse } from '../interfaces/user.interface';

type Role = 'USER' | 'ADMIN';

type GrantType = 'password' | 'refresh_token';

export type LoginBodyRequest = Pick<User, 'username'> & { password: string; grant_type: GrantType };

export type RegisterBodyRequest = Pick<User, 'email'> & {
    password: string;
    role: Role;
    enabled: boolean;
};

//export type UpdateCurrentUserBodyRequest = Pick<User, 'email' | 'username' | 'bio' | 'image'> & { password: string };

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);

    login(user: LoginBodyRequest): Observable<UserAPIResponse> {
        return this.http.post<UserAPIResponse>('oauth/token', user);
    }

    register(user: RegisterBodyRequest): Observable<void> {
        return this.http.post<void>('register', user);
    }

    refreshToken(user: LoginBodyRequest): Observable<UserAPIResponse> {
        return this.http.post<UserAPIResponse>(`oauth/token`, user);
    }

    // getCurrentUser(): Observable<UserAPIResponse> {
    //     return this.http.get<UserAPIResponse>('user', {
    //         context: new HttpContext().set(SkipLoading, true)
    //     });
    // }

    // updateCurrentUser(user: UpdateCurrentUserBodyRequest): Observable<UserAPIResponse> {
    //     return this.http.put<UserAPIResponse>('user', { user });
    // }
}
