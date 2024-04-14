import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { RightMenuComponent } from '../../../@shared/components/right-menu/right-menu.component';
import { SearchBarComponent } from '../../../@shared/components/search-bar/search-bar.component';
import { Logout } from '../../../authorization/store/state/auth.actions';
import { AuthState } from '../../../authorization/store/state/auth.state';

@Component({
    selector: 'app-search-header',
    standalone: true,
    templateUrl: './search-header.component.html',
    styleUrl: './search-header.component.scss',
    imports: [CommonModule, SearchBarComponent, RightMenuComponent]
})
export class SearchHeaderComponent {
    store = inject(Store);

    authenticated$ = this.store.select(AuthState.isAuthenticated);

    logout(): void {
        this.store.dispatch(new Logout());
    }
}
