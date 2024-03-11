import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://api.realworld.io/api/';
    constructor(private http: HttpClient) {}
    login(user: User) {
        return this.http.post(this.baseUrl + 'users', { user: user });
    }
}
