import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from '../../../authorization/store/state/auth.actions';
import { AuthState } from '../../../authorization/store/state/auth.state';
import { RightMenuComponent } from "../right-menu/right-menu.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, RouterModule, RightMenuComponent]
})
export class HeaderComponent {
    store = inject(Store);

    isAuthenticated$ = this.store.select(AuthState.isAuthenticated);

    currentUser$ = this.store.select(AuthState.currentUser);

    logout() {
        this.store.dispatch(new Logout());
    }
}
