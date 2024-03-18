import { LoginUser } from '../../interfaces/login-user.interface';
import { RegisterUser } from '../../interfaces/register-user.interface';

export class Login {
    static readonly type = '[Auth] Login user';
    constructor(public user: LoginUser) {}
}

export class Register {
    static readonly type = '[Auth] Register user';
    constructor(public user: RegisterUser) {}
}

export class Logout {
    static readonly type = '[Auth] Logout user';
}
