import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../@shared/components/search-bar/search-bar.component';
import { ShortcutsComponent } from '../shortcuts/shortcuts.component';
import { HeaderComponent } from '../../../@shared/components/header/header.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SearchBarComponent, ShortcutsComponent, HeaderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {}
