import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    private baseUrl = 'https://api.realworld.io/api/';

    constructor(private http: HttpClient) {}

    login(user: LoginBodyRequest): Observable<any> {
        return this.http.post<UserAPIResponse>(this.baseUrl + 'users/login', { user });
    }

    register(user: RegisterBodyRequest): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'users', { user });
    }

    getCurrentUser(): Observable<UserAPIResponse> {
        return this.http.get<UserAPIResponse>('/user');
    }

    updateCurrentUser(user: UpdateCurrentUserBodyRequest): Observable<UserAPIResponse> {
        return this.http.put<UserAPIResponse>('/user', { user });
    }

    refreshToken(): Observable<unknown> {
        return this.http.get<unknown>(`${this.baseUrl}/auth/refresh`);
    }
}
