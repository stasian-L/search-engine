import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { SearchFilterPipe } from '../../../@shared/pipes/search-filter.pipe';
import { CreateJob, GetAllJobs } from '../../store/state/crawler.actions';
import { CrawlerState } from '../../store/state/crawler.state';
import { CrawlerDialogComponent } from '../crawler-dialog/crawler-dialog.component';
import { JobItemComponent } from '../job-item/job-item.component';

export enum JobStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR'
}

@Component({
    selector: 'app-crawler-jobs-list',
    standalone: true,
    templateUrl: './crawler-jobs-list.component.html',
    styleUrl: './crawler-jobs-list.component.scss',
    imports: [
        AsyncPipe,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        SearchFilterPipe,
        JobItemComponent,
        MatDividerModule,
        MatTabsModule
    ]
})
export class CrawlerJobsListComponent {
    store = inject(Store);

    matDialog = inject(MatDialog);

    displayedColumns = ['jobId', 'url', 'info'];

    jobs$ = this.store.select(CrawlerState.jobs);

    searchTerm = '';

    refresh(): void {
        this.store.dispatch(new GetAllJobs());
    }

    createJob(): void {
        this.matDialog
            .open(CrawlerDialogComponent, {
                width: '800px',
                height: '850px'
            })
            .afterClosed()
            .pipe(filter(x => !!x))
            .subscribe(result => {
                this.store.dispatch(new CreateJob(result));
            });
    }
}
