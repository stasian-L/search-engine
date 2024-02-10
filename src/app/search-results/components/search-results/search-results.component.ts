import { Component } from '@angular/core';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { SearchListComponent } from './../search-list/search-list.component';

@Component({
    selector: 'app-search-results',
    standalone: true,
    imports: [SearchListComponent, SearchHeaderComponent],
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {}
