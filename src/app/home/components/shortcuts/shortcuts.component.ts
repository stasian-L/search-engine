import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { AddShortcut } from '../../store/state/home.actions';
import { AddShortcutDialogComponent } from '../add-shortcut-dialog/add-shortcut-dialog.component';

@Component({
    selector: 'app-shortcuts',
    standalone: true,
    imports: [MatIconModule, MatRippleModule],
    templateUrl: './shortcuts.component.html',
    styleUrl: './shortcuts.component.scss'
})
export class ShortcutsComponent {
    items: { url: string }[] = [
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        }
    ];

    store = inject(Store);
    dialog = inject(MatDialog);

    addShortcut(): void {
        this.dialog
            .open(AddShortcutDialogComponent, {
                data: {}
            })
            .afterClosed()
            .pipe(filter(x => !!x))
            .subscribe(result => {
                this.store.dispatch(new AddShortcut(result));
            });
    }
}
