import { Component } from '@angular/core';
import { ResultListComponent } from '../result-list/result-list.component';
import { SearchHeaderComponent } from '../serp-header/search-header.component';

@Component({
    selector: 'app-serp',
    standalone: true,
    imports: [ResultListComponent, SearchHeaderComponent],
    templateUrl: './serp.component.html',
    styleUrl: './serp.component.scss'
})
export class SerpComponent {}
