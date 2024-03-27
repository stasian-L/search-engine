import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { authGuard } from './@core/guards/auth.guard';
import { AuthState } from './authorization/store/state/auth.state';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./home/components/home/home.component').then(m => m.HomeComponent)
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
        loadComponent: () => import('./serp/components/serp/serp.component').then(m => m.SerpComponent)
    },
    {
        path: 'profile',
        title: 'Profile',
        redirectTo: '',
        canMatch: [authGuard]
    }
];
