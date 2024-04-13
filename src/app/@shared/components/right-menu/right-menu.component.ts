import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

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

    size = 96;

    imageUrl = 'assets/images/empty-profile.png';

    menuItems = [
        {
            icon: 'person',
            label: 'Profile',
            route: './profile'
        },
        {
            icon: 'tune',
            label: 'Appearance',
            route: './appearance'
        }
    ];
}
