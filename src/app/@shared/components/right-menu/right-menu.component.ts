import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { User } from '../../../authorization/interfaces/user.interface';

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
        throw new Error('Method not implemented.');
    }
}
