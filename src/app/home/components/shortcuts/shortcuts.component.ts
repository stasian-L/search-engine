import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { AddShortcut } from '../../store/state/home.actions';
import { AddShortcutDialogComponent } from '../add-shortcut-dialog/add-shortcut-dialog.component';
import { HomeState } from '../../store/state/home.state';
import { IconLinkPipe } from "../../../@shared/pipes/icon-link.pipe";

@Component({
    selector: 'app-shortcuts',
    standalone: true,
    templateUrl: './shortcuts.component.html',
    styleUrl: './shortcuts.component.scss',
    imports: [AsyncPipe, MatIconModule, MatRippleModule, IconLinkPipe]
})
export class ShortcutsComponent {
  store = inject(Store);
    items$ = this.store.select(HomeState.shortcuts);

    dialog = inject(MatDialog);

    addShortcut(): void {
        this.dialog
            .open(AddShortcutDialogComponent, {
                width: '440px'
            })
            .afterClosed()
            .pipe(filter(x => !!x))
            .subscribe(result => {
                this.store.dispatch(new AddShortcut(result));
            });
    }
}
