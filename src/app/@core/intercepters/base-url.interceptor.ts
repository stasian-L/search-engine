import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_API_URL } from '../tokens/tokens';

export const baseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const baseUrl = inject(BASE_API_URL);
    const apiReq = req.clone({ url: `${baseUrl}/${req.url}` });
    return next(apiReq);
};
