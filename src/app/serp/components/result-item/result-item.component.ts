import { Component } from '@angular/core';

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [],
  templateUrl: './result-item.component.html',
  styleUrl: './result-item.component.scss'
})
export class ResultItemComponent {
    resultItem = {
        title: 'blbllbblb',
        url: 'https://ba.com',
        description: 'hell yes hhaha ss hld fsdfl'
    }
}
