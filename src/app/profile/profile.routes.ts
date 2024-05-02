import { Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Profile',
        component: ProfileComponent,
    },
    { path: 'edit', title: 'Edit Profile', component: EditProfileComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
