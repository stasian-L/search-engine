import { LoginBodyRequest, RegisterBodyRequest, UpdateUserBodyRequest } from '../../services/auth.service';

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

export class RefreshToken {
    static readonly type = '[Auth] Refresh token';
}

export class GetCurrentUser {
    static readonly type = '[Auth] Get current user';
}

export class UpdateUser {
    static readonly type = '[Auth] Update user';

    constructor(public user: UpdateUserBodyRequest) {}
}
