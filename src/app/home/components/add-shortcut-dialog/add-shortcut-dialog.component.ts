import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-add-shortcut-dialog',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose
    ],
    templateUrl: './add-shortcut-dialog.component.html',
    styleUrl: './add-shortcut-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddShortcutDialogComponent {
    url = '';
    constructor(public dialogRef: MatDialogRef<AddShortcutDialogComponent>) {}
}
