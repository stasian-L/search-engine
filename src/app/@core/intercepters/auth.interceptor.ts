import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, EMPTY, Observable, catchError, filter, finalize, switchMap, take } from 'rxjs';
import { LoadingService } from '../../@shared/services/loading.service';
import { Logout, RefreshToken } from '../../authorization/store/state/auth.actions';
import { AuthState } from '../../authorization/store/state/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    store = inject(Store);

    loader = inject(LoadingService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.token);
        if (token) {
            req = this.addToken(req, token);
        }

        req = req.clone({
            withCredentials: true
        });

        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handleUnauthorized(req, next);
                }
                this.loader.loadingOff();
                console.log(error.error);
                return EMPTY;
            })
        );
    }

    addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.store.dispatch(new RefreshToken()).pipe(
                switchMap(() => {
                    this.isRefreshing = false;
                    const token = this.store.selectSnapshot(AuthState.token);
                    if (token) {
                        this.refreshTokenSubject.next(token);
                        return next.handle(this.addToken(request, token));
                    }

                    return this.store.dispatch(new Logout());
                }),
                catchError(() => this.store.dispatch(new Logout())),
                finalize(() => (this.isRefreshing = false))
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => next.handle(this.addToken(request, token)))
            );
        }
    }
}
