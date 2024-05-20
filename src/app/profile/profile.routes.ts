import { Routes } from '@angular/router';
import { jobsResolver } from '../@core/resolvers/jobs.resolver';
import { CrawlerJobsListComponent } from '../crawler/components/crawler-jobs/crawler-jobs-list.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'p',
        pathMatch: 'full'
    },
    {
        path: 'p',
        title: 'Profile',
        component: ProfileComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'view' },
            { path: 'view', title: 'View Profile', component: ProfileViewComponent },
            { path: 'edit', title: 'Edit Profile', component: EditProfileComponent },
            { path: 'jobs', title: 'Jobs', component: CrawlerJobsListComponent, resolve: [jobsResolver] }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
