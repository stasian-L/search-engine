import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { LoginUser } from '../../interfaces/login-user.interface';
import { AuthService } from './../../services/auth.service';
import { Login, Logout, Register } from './auth.actions';

export class AuthStateModel {
    currentUser: LoginUser | null = null;
    token: string | null = null;
}

const defaults: AuthStateModel = {
    currentUser: null,
    token: null
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

    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.token;
    }

    readonly authService = inject(AuthService);

    @Action(Login)
    onLogin({ patchState }: StateContext<AuthStateModel>, { user }: Login): Observable<LoginUser> {
        return this.authService.login(user).pipe(
            tap(result => {
                patchState({ currentUser: user, token: result.email });
            })
        );
    }

    @Action(Register)
    onRegister({ user }: Register): void {
        this.authService.register(user);
    }

    @Action(Logout)
    onLogout({ patchState }: StateContext<AuthStateModel>): void {
        patchState({ currentUser: null, token: null });
    }
}
