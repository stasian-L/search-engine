import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-result-item',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './result-item.component.html',
    styleUrl: './result-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultItemComponent implements OnInit {
    @Input({ required: true }) resultItem!: { title: string; url: string; description: string };

    ngOnInit() {
        if (!this.resultItem.url) {
            return;
        }

        const domain = new URL(this.resultItem.url);
        this.imageUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
    }

    imageUrl = '';
}
