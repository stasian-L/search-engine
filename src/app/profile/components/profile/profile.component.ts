import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProfileState } from '../../store/profile/profile.state';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrl: '../styles/profile.scss'
})
export class ProfileComponent {
    readonly route = inject(ActivatedRoute);
    readonly store = inject(Store);

    readonly fb = inject(FormBuilder);

    readonly profileDialog = inject(MatDialog);

    readonly profile$ = this.store.select(ProfileState.profile);
}
