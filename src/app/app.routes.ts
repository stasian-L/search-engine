import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { authGuard } from './@core/guards/auth.guard';
import { AuthState } from './authorization/store/state/auth.state';
import { ProfileState } from './profile/store/profile/profile.state';
import { profileResolver } from './@core/resolvers/profile.resolver';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
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
        providers: [importProvidersFrom(NgxsModule.forFeature([AuthState]))]
    },
    {
        path: 'profile',
        title: 'Profile',
        loadComponent: () => import('./profile/components/profile/profile.component').then(c => c.ProfileComponent),
        providers: [importProvidersFrom(NgxsModule.forFeature([ProfileState]))],
        resolve: [profileResolver],
        canMatch: [authGuard]
    }
];
