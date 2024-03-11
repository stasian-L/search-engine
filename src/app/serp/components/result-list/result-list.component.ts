import { Component, Input } from '@angular/core';
import { ResultItemComponent } from '../result-item/result-item.component';

@Component({
    selector: 'app-result-list',
    standalone: true,
    imports: [ResultItemComponent],
    templateUrl: './result-list.component.html',
    styleUrl: './result-list.component.scss'
})
export class ResultListComponent {
    @Input() results: any[] | undefined = [1];
}
