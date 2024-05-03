import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface UploadProfileImageData {
    imageUrl: string;
}

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
export class UploadProfileImageDialogComponent implements OnInit {
    dialogRef = inject(MatDialogRef<UploadProfileImageDialogComponent>);

    matDialogData: UploadProfileImageData = inject(MAT_DIALOG_DATA);

    imageUrl = '';

    imagePath = '';

    cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.imageUrl = this.matDialogData.imageUrl;
    }

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
