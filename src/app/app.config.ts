import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withDebugTracing()), provideHttpClient(), provideAnimations(), importProvidersFrom([BrowserAnimationsModule, NgxsModule.forRoot()])]
};
