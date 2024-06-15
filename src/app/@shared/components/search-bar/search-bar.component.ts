import { ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Search } from '../../../serp/store/state/serp.actions';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [MatInputModule, MatIconModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatButtonModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
    @HostBinding('class.focused') focused: boolean = false;

    @Input() set query(value: string | null) {
        this.searchControl.setValue(value);
    }

    store = inject(Store);

    activatedRoute = inject(ActivatedRoute);

    searchControl = new FormControl('');

    searchForm = inject(FormBuilder).nonNullable.group(this.searchControl);

    search(): void {
        if (!this.searchControl.valid || !this.searchControl.value) {
            return;
        }

        if (this.activatedRoute.snapshot.url[0]?.path === 'search') {
            this.store.dispatch(new Search(this.searchControl.value));
        }
        this.store.dispatch(new Navigate(['search'], { searchTerm: this.searchControl.value }));
    }
}
