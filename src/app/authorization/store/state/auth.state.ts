import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { LocalStoreService } from '../../../@core/services/local-store.service';
import { LoginUser } from '../../interfaces/login-user.interface';
import { AuthService } from './../../services/auth.service';
import { Login, Register } from './auth.actions';

export class AuthStateModel {
    currentUser: LoginUser | null = null;
}

const defaults = {
    currentUser: null
};

@State<AuthStateModel>({
    name: 'auth',
    defaults
})
@Injectable()
export class AuthState {
    constructor(private authService: AuthService, private localStore: LocalStoreService) {}

    @Action(Login)
    onLogin({ patchState }: StateContext<AuthStateModel>, { user }: Login) {
        this.authService.login(user).pipe(tap(result => this.localStore.saveData('access_token', result.token as string)));
        patchState({ currentUser: user });
    }

    @Action(Register)
    onRegister({ user }: Register) {
        this.authService.register(user)
    }
}
