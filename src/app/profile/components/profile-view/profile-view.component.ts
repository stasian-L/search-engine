import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, HostBinding, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { ImageUploadComponent } from '../../../@shared/components/image-upload/image-upload.component';
import { ModelFormGroup } from '../../../@shared/utils/utility-types';
import { UpdateUserBodyRequest } from '../../../authorization/services/auth.service';
import { UpdateUser } from '../../../authorization/store/state/auth.actions';
import { AuthState } from '../../../authorization/store/state/auth.state';
type UserFormGroup = ModelFormGroup<NonNullable<UpdateUserBodyRequest>>;

@Component({
    selector: 'app-profile-view',
    standalone: true,
    templateUrl: './profile-view.component.html',
    styleUrl: '../styles/profile.scss',
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatTabsModule,
        MatDividerModule,
        ReactiveFormsModule,
        ImageUploadComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileViewComponent implements OnInit {
    destroyRef = inject(DestroyRef);

    cdr = inject(ChangeDetectorRef);

    readonly route = inject(ActivatedRoute);

    readonly store = inject(Store);

    readonly fb = inject(FormBuilder);

    readonly profileDialog = inject(MatDialog);

    readonly profile$ = this.store.select(AuthState.currentUser);

    readonly defaultPhoto = 'assets/images/empty-profile.png';

    @HostBinding('class.edit-mode') editMode = false;

    image?: string;

    profileForm: UserFormGroup = this.fb.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        image: [''],
        email: ['', Validators.required],
        phone: ['']
    });

    prevProfileForm: UserFormGroup = this.fb.group({ ...this.profileForm.controls });

    ngOnInit(): void {
        this.createForm();
        this.profileForm.controls.image.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.cdr.detectChanges();
        });
    }

    saveChanges(): void {
        if (this.profileForm.invalid) {
            return;
        }

        this.store.dispatch(new UpdateUser(this.profileForm.getRawValue()));
        this.editMode = false;
    }

    cancel(): void {
        this.editMode = false;
        this.profileForm = this.fb.group({ ...this.prevProfileForm.controls });
        this.cdr.detectChanges();
    }

    createForm(): void {
        this.profile$
            .pipe(
                filter(user => user !== null),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(user => {
                if (!user) {
                    return;
                }

                this.profileForm = this.fb.nonNullable.group({
                    firstName: [user.firstName, Validators.required],
                    lastName: [user.lastName, Validators.required],
                    username: [user.username, Validators.required],
                    image: [user.image],
                    email: [user.email, Validators.required],
                    phone: [user.phone]
                });
                this.prevProfileForm = this.fb.nonNullable.group({
                    firstName: [user.firstName, Validators.required],
                    lastName: [user.lastName, Validators.required],
                    username: [user.username, Validators.required],
                    image: [user.image],
                    email: [user.email, Validators.required],
                    phone: [user.phone]
                });
            });
    }
}
