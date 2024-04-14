import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../../authorization/store/state/auth.actions';
import { AuthState } from '../../../authorization/store/state/auth.state';
import { RightMenuComponent } from '../right-menu/right-menu.component';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RightMenuComponent]
})
export class HeaderComponent {
    store = inject(Store);

    isAuthenticated$ = this.store.select(AuthState.isAuthenticated);

    currentUser$ = this.store.select(AuthState.currentUser);

    logout(): void {
        this.store.dispatch(new Logout());
    }
}
