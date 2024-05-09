import { ResolveFn } from '@angular/router';

export const profileResolver: ResolveFn<boolean> = () => {
    //inject(Store).dispatch(new GetProfile());
    return true;
};
