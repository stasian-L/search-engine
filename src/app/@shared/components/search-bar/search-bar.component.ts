import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [MatInputModule, MatIconModule, ReactiveFormsModule, FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchControl = new FormControl('hi');
}
