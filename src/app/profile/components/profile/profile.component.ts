import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileState } from '../../store/profile/profile.state';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    readonly store = inject(Store);
    profile$ = this.store.select(ProfileState.profile);
}
//to do
