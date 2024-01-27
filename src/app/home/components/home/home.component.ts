import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../@shared/components/search-bar/search-bar.component';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SearchBarComponent, ShortcutsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {}
