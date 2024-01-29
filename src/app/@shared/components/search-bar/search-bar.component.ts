import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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

    searchControl = new FormControl('hi');
}
