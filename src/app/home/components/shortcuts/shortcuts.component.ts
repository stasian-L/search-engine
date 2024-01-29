import { Component } from '@angular/core';

@Component({
    selector: 'app-shortcuts',
    standalone: true,
    imports: [],
    templateUrl: './shortcuts.component.html',
    styleUrl: './shortcuts.component.scss'
})
export class ShortcutsComponent {
    items: unknown[] |  undefined;
}
