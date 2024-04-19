import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { SerpState } from '../../store/state/serp.state';
import { ResultListComponent } from '../result-list/result-list.component';
import { SearchHeaderComponent } from '../serp-header/search-header.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-serp',
    standalone: true,
    imports: [AsyncPipe, ResultListComponent, SearchHeaderComponent],
    templateUrl: './serp.component.html',
    styleUrl: './serp.component.scss'
})
export class SerpComponent {
    store = inject(Store);

    results$ = this.store.select(SerpState.results);
}
