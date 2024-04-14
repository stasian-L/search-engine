import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';

export const BASE_API_URL = new InjectionToken<string>('BASE_API_URL');

export const baseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const baseUrl = inject(BASE_API_URL);
    const apiReq = req.clone({ url: `${baseUrl}/${req.url}` });
    return next(apiReq);
};
