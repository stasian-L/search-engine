import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../../authorization/services/auth.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../../authorization/store/state/auth.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    authService = inject(AuthService);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.getAccessToken()) {
            request = this.addToken(request, this.getAccessToken());
        } else {
        }

        request = request.clone({
            withCredentials: true
        });

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                } else {
                    console.log(error.error);
                    return throwError(() => error);
                }
            })
        );
    }

    addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Access-Token': `${token}`,
                Authorization: `Barear ${token}`
            }
        });
    }

    getAccessToken(): string  | null {
        return inject(Store).selectSnapshot(AuthState.token);
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.accessToken);
                    return next.handle(this.addToken(request, token.accessToken));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(accessToken => {
                    console.log('get token', accessToken);
                    return next.handle(this.addToken(request, accessToken));
                })
            );
        }
    }
}
