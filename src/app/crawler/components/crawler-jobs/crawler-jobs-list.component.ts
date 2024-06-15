import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatestWith, filter, map } from 'rxjs';
import { SearchBarRotateComponent } from '../../../@shared/components/search-bar-rotate/app-search-bar-rotate.component';
import { SearchFilterPipe } from '../../../@shared/pipes/search-filter.pipe';
import { CreateJob, GetAllJobs } from '../../store/state/crawler.actions';
import { CrawlerState } from '../../store/state/crawler.state';
import { CrawlerDialogComponent } from '../crawler-dialog/crawler-dialog.component';
import { JobItemComponent } from '../job-item/job-item.component';

@Component({
    selector: 'app-crawler-jobs-list',
    standalone: true,
    templateUrl: './crawler-jobs-list.component.html',
    styleUrl: './crawler-jobs-list.component.scss',
    imports: [
        AsyncPipe,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        SearchFilterPipe,
        JobItemComponent,
        MatDividerModule,
        MatTabsModule,
        SearchBarRotateComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrawlerJobsListComponent {
    store = inject(Store);

    matDialog = inject(MatDialog);

    cdr = inject(ChangeDetectorRef);

    displayedColumns = ['jobId', 'url', 'info'];

    searchTerm$ = new BehaviorSubject<string | null>('');

    jobs$ = this.store.select(CrawlerState.jobs);

    filteredJobs$ = this.jobs$.pipe(
        combineLatestWith(this.searchTerm$),
        map(([jobs, searchTerm]) => {
            return jobs.filter(job => job.seedUrls[0].toLowerCase().includes(searchTerm?.toLowerCase() ?? ''));
        })
    );

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

    onJobsStatusChange(event: MatTabChangeEvent): void {
        const selectedStatus = event.tab.textLabel.toLowerCase();
        console.log(selectedStatus);
        this.filteredJobs$ = this.jobs$;
        if (selectedStatus === 'all jobs') {
            return;
        }

        this.filteredJobs$ = this.jobs$.pipe(map(jobs => jobs.filter(job => job.crawlStatus === selectedStatus)));
    }
}
