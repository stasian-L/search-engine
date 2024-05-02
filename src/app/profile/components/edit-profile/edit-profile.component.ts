import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { UploadProfileImageDialogComponent } from '../upload-profile-image-dialog/upload-profile-image-dialog.component';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './edit-profile.component.html',
    styleUrl: '../styles/profile.scss'
})
export class EditProfileComponent {
    uploadImageDialog = inject(MatDialog);
    fb = inject(FormBuilder);

    cdr = inject(ChangeDetectorRef);

    profileForm = this.fb.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        bio: [''],
        profileImage: '',
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.minLength(6)],
        phone: ['']
    });

    profileImage = '';

    onOpenUploadDialog(): void {
        this.uploadImageDialog
            .open(UploadProfileImageDialogComponent, {
                width: '500px'
            })
            .afterClosed()
            .pipe(filter(x => !!x))
            .subscribe(result => {
                console.log(result);

                this.profileForm.controls.profileImage = result;
                this.profileImage = result;
                this.cdr.markForCheck();
            });
    }

    saveChanges() {
        throw new Error('Method not implemented.');
    }
}
