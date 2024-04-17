import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../authorization/store/state/auth.state';
import { GetProfile } from '../../profile/store/profile/profile.actions';

export const profileResolver: ResolveFn<boolean> = () => {
    const store = inject(Store);
    store.dispatch(new GetProfile(store.selectSnapshot(AuthState.currentUser)?.username ?? ''));
    return true;
};
