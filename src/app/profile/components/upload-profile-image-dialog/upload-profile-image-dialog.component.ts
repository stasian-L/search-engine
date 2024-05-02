import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-upload-profile-image-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './upload-profile-image-dialog.component.html',
    styleUrl: './upload-profile-image-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadProfileImageDialogComponent {
    imageUrl = '';
    imagePath = '';
    dialogRef = inject(MatDialogRef<UploadProfileImageDialogComponent>);

    cdr = inject(ChangeDetectorRef);

    onFileSelected(event: any) {
        console.log(event.target.value);
        if (event.target.value) {
            this.imagePath = event.target.value;
        }

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.imageUrl = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }

        this.cdr.markForCheck();
    }
}
