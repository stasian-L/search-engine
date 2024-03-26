import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AuthState } from '../../authorization/store/state/auth.state';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);

    const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
        store.dispatch(new Navigate(['login']));
    }

    return isAuthenticated;
};
