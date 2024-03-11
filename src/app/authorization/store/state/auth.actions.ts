import { User } from "../../interfaces/user.interface";

export class Login {
  static readonly type = '[Auth] Login user';
  constructor(public user: User) { }
}

export class Register {
    static readonly type = '[Auth] Register user';
    constructor(public user: User) { }
  }
