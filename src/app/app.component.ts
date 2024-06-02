import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './@shared/components/loading/loading.component';
import { Store } from '@ngxs/store';
import { GetCurrentUser } from './authorization/store/state/auth.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, LoadingComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    store = inject(Store);

    ngOnInit(): void {
        this.store.dispatch(new GetCurrentUser());
    }
}
