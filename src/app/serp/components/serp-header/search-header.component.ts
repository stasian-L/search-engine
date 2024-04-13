import { Component } from '@angular/core';
import { SearchBarComponent } from "../../../@shared/components/search-bar/search-bar.component";

@Component({
    selector: 'app-search-header',
    standalone: true,
    templateUrl: './search-header.component.html',
    styleUrl: './search-header.component.scss',
    imports: [SearchBarComponent]
})
export class SearchHeaderComponent {}
