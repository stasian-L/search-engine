import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthInterceptor } from './@core/intercepters/auth.interceptor';
import { SerpState } from './serp/store/state/serp.state';

import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment.development';
import { baseUrlInterceptor } from './@core/intercepters/base-url.interceptor';
import { loadingInterceptor } from './@core/intercepters/loading.interceptor';
import { BASE_API_URL } from './@core/tokens/tokens';
import { ToastrState } from './@shared/store/state/toastr.state';
import { routes } from './app.routes';
import { AuthState } from './authorization/store/state/auth.state';
import { CrawlerState } from './crawler/store/state/crawler.state';
import { HomeState } from './home/store/state/home.state';
import { NgCircleProgressModule } from 'ng-circle-progress';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([loadingInterceptor, baseUrlInterceptor]), withInterceptorsFromDi()),
        provideAnimations(),
        importProvidersFrom([
            BrowserAnimationsModule,
            NgxsModule.forRoot([AuthState, HomeState, SerpState, CrawlerState, ToastrState]),
            NgxsRouterPluginModule.forRoot(),
            NgxsReduxDevtoolsPluginModule.forRoot(),
            NgxsLoggerPluginModule.forRoot(),
            NgxsStoragePluginModule.forRoot({
                key: ['auth.accessToken', 'auth.refreshToken', 'serp.query']
            }),
            ToastrModule.forRoot({
                positionClass: 'toast-bottom-right'
            }),
            NgCircleProgressModule.forRoot({
                maxPercent: 100,
                radius: 40,
                outerStrokeWidth: 8,
                outerStrokeColor: "#7270e6",
                animationDuration: 300,
                innerStrokeColor: '#e7e8ea',
                innerStrokeWidth: 7,
                space: -10
              })
        ]),
        { provide: BASE_API_URL, useValue: environment.apiUrl },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
};
