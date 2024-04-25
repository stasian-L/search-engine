import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { RefreshToken } from '../../authorization/store/state/auth.actions';
import { AuthState } from '../../authorization/store/state/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    store = inject(Store);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.token);
        if (token) {
            this.addToken(req, token);
        }

        req = req.clone({
            withCredentials: true
        });

        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(req, next);
                } else {
                    console.log(error.error);
                    return throwError(() => error);
                }
            })
        );
    }

    addToken(req: HttpRequest<any>, token: string | null): void {
        req.headers.append('Authorization', `Barear ${token}`);
        req.headers.append('Access-Token', `${token}`);
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.store.dispatch(new RefreshToken()).pipe(
                switchMap(() => {
                    this.isRefreshing = false;
                    const token = this.store.selectSnapshot(AuthState.token);
                    this.refreshTokenSubject.next(token);
                    return next.handle(request);
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    console.log('get token', token);
                    this.addToken(request, token);
                    return next.handle(request);
                })
            );
        }
    }
}
