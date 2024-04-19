import { HttpContextToken, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../@shared/services/loading.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (req.context.get(SkipLoading)) {
        // Pass the request directly to the next handler
        return next(req);
    }

    const loader = inject(LoadingService);
    // Turn on the loading spinner
    loader.loadingOn();
    return next(req).pipe(
        finalize(() => {
            // Turn off the loading spinner
            loader.loadingOff();
        })
    );
};
