import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-result-item',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './result-item.component.html',
    styleUrl: './result-item.component.scss'
})
export class ResultItemComponent implements OnInit {
    @Input({ required: true }) resultItem!: { title: string; link: string; snippet: string };

    ngOnInit() {
        const domain = new URL(this.resultItem?.link ?? '');
        this.imageUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
    }

    imageUrl = '';
}
