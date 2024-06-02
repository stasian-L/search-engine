import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { JoinPipe } from '../../../@shared/pipes/join.pipe';
import { Job } from '../../interfaces/job.interface';

@Component({
    selector: 'app-job-item',
    standalone: true,
    templateUrl: './job-item.component.html',
    styleUrl: './job-item.component.scss',
    imports: [MatIconModule, MatButtonModule, JoinPipe, NgCircleProgressModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobItemComponent implements AfterViewInit {
    cdr = inject(ChangeDetectorRef);

    input({ required: true }) job: Job | null = null;

    progress = computed(() => {
        if (!this.job?.totalUrls || this.job.processedUrls) {
            return 0;
        }

        return (this.job.processedUrls / this.job?.totalUrls) * 100;
    });

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    cancelJob(): void {}
}
