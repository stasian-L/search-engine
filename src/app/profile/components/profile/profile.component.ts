import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from '../../store/profile/profile.state';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    readonly dialog = inject(MatDialog);
    readonly store = inject(Store);
    readonly profile$ = this.store.select(ProfileState.profile);

    editProfile(): void {}
}
