import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./authorization/components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./authorization/components/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'search',
        loadComponent: () => import('./serp/components/serp/serp.component').then(m => m.SerpComponent)
    }
];
