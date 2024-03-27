import { Injectable, inject } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { User, UserAPIResponse } from '../../interfaces/user.interface';
import { AuthService } from './../../services/auth.service';
import { Login, Logout, Register } from './auth.actions';

export class AuthStateModel {
    currentUser: User | null = null;
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
  readonly authService = inject(AuthService);

  readonly store = inject(Store);

    @Selector()
    static currentUser(state: AuthStateModel): User | null {
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

    @Action(Login)
    onLogin({ patchState }: StateContext<AuthStateModel>, { user }: Login): Observable<UserAPIResponse> {
        return this.authService.login(user).pipe(
            tap(user => {
                patchState({ currentUser: user.user, token: user.user.token });
                this.store.dispatch(new Navigate(['']));
            })
        );
    }

    @Action(Register)
    onRegister({}: StateContext<AuthStateModel>, { user }: Register): Observable<UserAPIResponse> {
        return this.authService.register(user).pipe(tap(this.store.dispatch(new Navigate(['login']))));
    }

    @Action(Logout)
    onLogout({ patchState }: StateContext<AuthStateModel>): void {
        patchState({ currentUser: null, token: null });
    }
}
