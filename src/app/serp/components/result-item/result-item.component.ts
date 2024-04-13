import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-result-item',
    standalone: true,
    imports: [],
    templateUrl: './result-item.component.html',
    styleUrl: './result-item.component.scss'
})
export class ResultItemComponent {
    @Input({ required: true }) resultItem!: { title: string; url: string; description: string; };
}
