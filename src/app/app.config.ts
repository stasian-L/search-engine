import { SerpState } from './serp/store/state/serp.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withDebugTracing } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { authInterceptor } from './@core/intercepters/auth.interceptor';

import { environment } from '../environments/environment.development';
import { baseUrlInterceptor } from './@core/intercepters/base-url.interceptor';
import { BASE_API_URL } from './@core/tokens/tokens';
import { routes } from './app.routes';
import { AuthState } from './authorization/store/state/auth.state';
import { HomeState } from './home/store/state/home.state';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withDebugTracing()),
        provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
        provideAnimations(),
        importProvidersFrom([
            BrowserAnimationsModule,
            NgxsModule.forRoot([AuthState, HomeState, SerpState]),
            NgxsRouterPluginModule.forRoot(),
            NgxsReduxDevtoolsPluginModule.forRoot(),
            NgxsLoggerPluginModule.forRoot(),
            NgxsStoragePluginModule.forRoot({
                key: 'auth.token'
            })
        ]),
        { provide: BASE_API_URL, useValue: environment.apiUrl }
    ]
};
