import { Injectable, inject } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { User, UserAPIResponse } from '../../interfaces/user.interface';
import { AuthService } from './../../services/auth.service';
import { GetCurrentUser, Login, Logout, RefreshToken, Register, UpdateUser } from './auth.actions';

export class AuthStateModel {
    currentUser: User | null = null;
    accessToken: string | null = null;
    refreshToken: string | null = null;
}

const defaults: AuthStateModel = {
    currentUser: null,
    accessToken: null,
    refreshToken: null
};

@State<AuthStateModel>({
    name: 'auth',
    defaults
})
@Injectable()
export class AuthState {
    private readonly authService = inject(AuthService);

    private readonly store = inject(Store);

    @Selector()
    static currentUser(state: AuthStateModel): User | null {
        return state.currentUser;
    }

    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.accessToken;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.accessToken;
    }

    @Action(Login)
    onLogin({ patchState }: StateContext<AuthStateModel>, { user }: Login): Observable<UserAPIResponse> {
        return this.authService.login(user).pipe(
            tap(user => {
                patchState({ accessToken: user.access_token, refreshToken: user.refresh_token });
                this.store.dispatch(new Navigate(['']));
            })
        );
    }

    @Action(Register)
    onRegister({}: StateContext<AuthStateModel>, { user }: Register): Observable<string> {
        return this.authService.register(user).pipe(tap(this.store.dispatch(new Navigate(['confirm-email'], { email: user.email }))));
    }

    @Action(Logout)
    onLogout({ patchState }: StateContext<AuthStateModel>): void {
        patchState({ currentUser: null, accessToken: null, refreshToken: null });
    }

    @Action(GetCurrentUser)
    onLoadCurrentUser({ patchState }: StateContext<AuthStateModel>): Observable<User> {
        return this.authService.getCurrentUser().pipe(tap(user => patchState({ currentUser: user })));
    }

    @Action(UpdateUser)
    onUpdateUser({ patchState }: StateContext<AuthStateModel>, { user }: UpdateUser): Observable<User> {
        return this.authService.updateUser(user).pipe(tap(user => patchState({ currentUser: user })));
    }

    @Action(RefreshToken)
    onRefreshToken({ patchState, getState }: StateContext<AuthStateModel>): Observable<UserAPIResponse> {
        const { refreshToken } = getState();
        patchState({ accessToken: null });
        return this.authService
            .refreshToken({ refresh_token: refreshToken ?? '', grant_type: 'refresh_token', client_id: 'gigy', client_secret: 'secret' })
            .pipe(tap(user => patchState({ accessToken: user.access_token })));
    }
}
