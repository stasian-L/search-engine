import { Component } from '@angular/core';
import { SearchHeaderComponent } from '../serp-header/search-header.component';
import { ResultListComponent } from '../result-list/result-list.component';

@Component({
    selector: 'app-serp',
    standalone: true,
    imports: [ResultListComponent, SearchHeaderComponent],
    templateUrl: './serp.component.html',
    styleUrl: './serp.component.scss'
})
export class SerpComponent {}
