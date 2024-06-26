import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { authGuard } from './@core/guards/auth.guard';
import { profileResolver } from './@core/resolvers/profile.resolver';
import { searchResultsResolver } from './@core/resolvers/search-results.resolver';
import { userResolver } from './@core/resolvers/user.resolver';
import { AuthState } from './authorization/store/state/auth.state';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        resolve: [userResolver],
        loadComponent: () => import('./home/components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./authorization/components/login/login.component').then(c => c.LoginComponent),
        providers: [importProvidersFrom(NgxsModule.forFeature([AuthState]))]
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./authorization/components/register/register.component').then(c => c.RegisterComponent),
        providers: [importProvidersFrom(NgxsModule.forFeature([AuthState]))]
    },
    {
        path: 'search',
        title: 'Search',
        loadComponent: () => import('./serp/components/serp/serp.component').then(c => c.SerpComponent),
        providers: [importProvidersFrom(NgxsModule.forFeature([AuthState]))],
        resolve: [searchResultsResolver, userResolver]
    },
    {
        path: 'profile',
        title: 'Profile',
        loadChildren: () => import('./profile/profile.routes').then(r => r.routes),
        resolve: [profileResolver],
        canMatch: [authGuard]
    },
    {
        path: 'confirm-email',
        title: 'Email Confirmation',
        loadComponent: () =>
            import('./authorization/components/confirm-email-page/confirm-email-page.component').then(c => c.ConfirmEmailPageComponent)
    },
    {
        path: 'email-confirmed',
        title: 'Email Confirmed',
        loadComponent: () =>
            import('./authorization/components/email-confirmed/email-confirmed.component').then(c => c.EmailConfirmedComponent)
    }
];
