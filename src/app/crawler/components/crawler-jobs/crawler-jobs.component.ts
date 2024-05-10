import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { SearchFilterPipe } from '../../../@shared/pipes/search-filter.pipe';
import { CreateJob, GetAllJobs } from '../../store/state/crawler.actions';
import { CrawlerState } from '../../store/state/crawler.state';
import { CrawlerDialogComponent } from '../crawler-dialog/crawler-dialog.component';

@Component({
    selector: 'app-crawler-jobs',
    standalone: true,
    imports: [
        MatTableModule,
        AsyncPipe,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        SearchFilterPipe,
        MatSortModule
    ],
    templateUrl: './crawler-jobs.component.html',
    styleUrl: './crawler-jobs.component.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class CrawlerJobsComponent {
    store = inject(Store);

    matDialog = inject(MatDialog);

    displayedColumns = ['jobId', 'url', 'info'];

    dataSource$ = this.store.select(CrawlerState.jobs);

    searchTerm = '';

    refresh(): void {
        this.store.dispatch(new GetAllJobs());
    }

    createJob() {
        this.matDialog
            .open(CrawlerDialogComponent, {
                width: '520px'
            })
            .afterClosed()
            .pipe(filter(x => !!x))
            .subscribe(result => {
                this.store.dispatch(new CreateJob(result));
            });
    }
}
