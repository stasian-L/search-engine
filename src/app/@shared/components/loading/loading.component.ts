import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {
    @Input() detectRouteTransitions = false;

    @ContentChild('loading')
    customLoadingIndicator: TemplateRef<any> | null = null;

    loadingService = inject(LoadingService);

    loading$ = this.loadingService.loading$;

    ngOnInit() {
        if (this.detectRouteTransitions) {
            inject(Router)
                .events.pipe(
                    tap(event => {
                        if (event instanceof RouteConfigLoadStart) {
                            this.loadingService.loadingOn();
                        } else if (event instanceof RouteConfigLoadEnd) {
                            this.loadingService.loadingOff();
                        }
                    })
                )
                .subscribe();
        }
    }
}
