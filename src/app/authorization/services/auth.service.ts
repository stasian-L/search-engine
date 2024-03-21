import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../interfaces/login-user.interface';
import { RegisterUser } from '../interfaces/register-user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://api.realworld.io/api/';

    constructor(private http: HttpClient) {}

    login(user: LoginUser): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'users', { user: user });
    }

    register(user: RegisterUser): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'user/', user, {
            withCredentials: true
        });
    }

    refreshToken(): Observable<unknown> {
        return this.http
            .get<unknown>(`${this.baseUrl}/auth/refresh`, {
                withCredentials: true
            });
    }
}
