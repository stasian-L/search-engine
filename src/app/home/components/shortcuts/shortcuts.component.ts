import { Component } from '@angular/core';

@Component({
    selector: 'app-shortcuts',
    standalone: true,
    imports: [],
    templateUrl: './shortcuts.component.html',
    styleUrl: './shortcuts.component.scss'
})
export class ShortcutsComponent {
    items: { url: string }[] = [
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
        {
            url: 'https://fashion4you.ua/images/commodities/3079/1520096647_%D1%84%D0%B5%D1%80%D0%B0%D1%80%D0%B8.jpg'
        },
    ];
}
