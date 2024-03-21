import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withDebugTracing()),
        provideHttpClient(),
        provideAnimations(),
        importProvidersFrom([
            BrowserAnimationsModule,
            NgxsModule.forRoot(),
            NgxsRouterPluginModule.forRoot(),
            NgxsStoragePluginModule.forRoot({
                key: 'auth.token'
            })
        ])
    ]
};
