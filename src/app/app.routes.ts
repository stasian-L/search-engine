import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './authorization/store/state/auth.state';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./authorization/components/login/login.component').then(c => c.LoginComponent),
        providers: [importProvidersFrom(NgxsModule.forFeature([AuthState]))]
    },
    {
        path: 'register',
        loadComponent: () => import('./authorization/components/register/register.component').then(c => c.RegisterComponent),
        providers: [importProvidersFrom(NgxsModule.forFeature([AuthState]))]
    },
    {
        path: 'search',
        loadComponent: () => import('./serp/components/serp/serp.component').then(m => m.SerpComponent)
    }
];
