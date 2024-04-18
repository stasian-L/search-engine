import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { catchError, throwError } from 'rxjs';
import { AuthState } from '../../authorization/store/state/auth.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store);
    const token = store.selectSnapshot(AuthState.token);
    if (req.url.includes('/api/') && !req.headers.has('Authorization') && token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Token ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                store.dispatch(new Navigate(['login']));
            }

            console.log(error.error);
            return throwError(() => error);
        })
    );
};
//function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn): any {}
