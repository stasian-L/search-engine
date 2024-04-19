import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-add-shortcut-dialog',
    standalone: true,
    imports: [],
    templateUrl: './add-shortcut-dialog.component.html',
    styleUrl: './add-shortcut-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddShortcutDialogComponent {}
