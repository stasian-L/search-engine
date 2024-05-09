import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { CrawlerState } from '../../store/state/crawler.state';

@Component({
    selector: 'app-crawler-jobs',
    standalone: true,
    imports: [MatTableModule, AsyncPipe],
    templateUrl: './crawler-jobs.component.html',
    styleUrl: './crawler-jobs.component.scss'
})
export class CrawlerJobsComponent {
    store = inject(Store);

    displayedColumns = ['jobId', 'url', 'info'];

    dataSource$ = this.store.select(CrawlerState.jobs);
}
