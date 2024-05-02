import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetCurrentUser } from '../../authorization/store/state/auth.actions';

export const userResolver: ResolveFn<boolean> = () => {
    inject(Store).dispatch(new GetCurrentUser());
    return true;
};
