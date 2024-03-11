import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { User } from '../../interfaces/user.interface';
import { Login } from './auth.actions';

export class AuthStateModel {
    currentUser: User | null = null;
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
    @Action(Login)
    add({ getState, setState }: StateContext<AuthStateModel>, { user }: Login) {
        const state = getState();
        setState({  ...state, currentUser: user });
    }
}
