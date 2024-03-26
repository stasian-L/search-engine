import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '../../authorization/store/state/auth.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(AuthState.token);
    if (req.url.includes('/api/') && !req.headers.has('Authorization') && token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Token ${token}`
            }
        });
    }
    return next(req);
};
