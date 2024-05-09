import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { User } from '../../../authorization/interfaces/user.interface';
import { CrawlerDialogComponent } from '../../../crawler/components/crawler-dialog/crawler-dialog.component';
import { CreateJob } from '../../../crawler/store/state/crawler.actions';

@Component({
    selector: 'app-right-menu',
    standalone: true,
    imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, RouterModule],
    templateUrl: './right-menu.component.html',
    styleUrl: './right-menu.component.scss'
})
export class RightMenuComponent {
    @Output() logout = new EventEmitter();

    @Input() authenticated = false;

    @Input() user: User | null = null;

    @Input() set imageUrl(value: string | null | undefined) {
        if (!value) {
            this._imageUrl = 'assets/images/empty-profile.png';
        }
    }

    matDialog = inject(MatDialog);

    store = inject(Store);

    get imageUrl() {
        return this._imageUrl;
    }
    private _imageUrl = '';

    size = 96;

    menuItems = [
        {
            icon: 'person',
            label: 'Profile',
            route: '/profile'
        },
        {
            icon: 'tune',
            label: 'Appearance',
            route: '/appearance'
        }
    ];

    onOpenCrawlerDialog() {
        this.matDialog
            .open(CrawlerDialogComponent, {
                width: '500px'
            })
            .afterClosed()
            .pipe(filter(x => !!x))
            .subscribe(result => {
                this.store.dispatch(new CreateJob(result));
            });
    }
}
