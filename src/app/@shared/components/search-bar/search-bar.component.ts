import { ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngxs/store';
import { Search } from '../../../serp/store/state/serp.actions';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [MatInputModule, MatIconModule, ReactiveFormsModule, FormsModule],
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

    searchControl = new FormControl('');

    search() {
        this.store.dispatch(new Search(this.searchControl.value ?? ''));
    }
}
