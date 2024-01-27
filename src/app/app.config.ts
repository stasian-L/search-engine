import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withDebugTracing()), provideAnimations(), importProvidersFrom([BrowserAnimationsModule])]
};
