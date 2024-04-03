import { LoginBodyRequest, RegisterBodyRequest } from '../../services/auth.service';

export class Login {
    static readonly type = '[Auth] Login user';
    constructor(public user: LoginBodyRequest) {}
}

export class Register {
    static readonly type = '[Auth] Register user';
    constructor(public user: RegisterBodyRequest) {}
}

export class Logout {
    static readonly type = '[Auth] Logout user';
}

export class GetCurrentUser {
    static readonly type = '[Auth] Get current user';
}
