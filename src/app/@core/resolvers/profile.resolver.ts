import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProfile } from '../../profile/store/profile/profile.actions';

export const profileResolver: ResolveFn<boolean> = () => {
    inject(Store).dispatch(new GetProfile());
    return true;
};
