import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { LocalStoreService } from '../../../@core/services/local-store.service';
import { LoginUser } from '../../interfaces/login-user.interface';
import { AuthService } from './../../services/auth.service';
import { Login, Logout, Register } from './auth.actions';

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
    @Selector()
    static currentUser(state: AuthStateModel): LoginUser | null {
        return state.currentUser;
    }

    constructor(private authService: AuthService, private localStore: LocalStoreService) {}

    @Action(Login)
    onLogin({ patchState }: StateContext<AuthStateModel>, { user }: Login) {
        return this.authService.login(user).pipe(
            tap(result => {
                this.localStore.saveData('access_token', result.token as string);
                patchState({ currentUser: user });
            })
        );
    }

    @Action(Register)
    onRegister({ user }: Register) {
        this.authService.register(user);
    }

    @Action(Logout)
    onLogout({ patchState }: StateContext<AuthStateModel>) {
        this.localStore.removeData('access_token');
        patchState({ currentUser: null });
    }
}
