import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadingComponent } from './@shared/components/loading/loading.component';
import { GetCurrentUser } from './authorization/store/state/auth.actions';
import { SetMobileView } from './home/store/state/home.actions';

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
        this.onResize();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth < 720) {
            this.store.dispatch(new SetMobileView(true));
        } else {
            this.store.dispatch(new SetMobileView(false));
        }
    }
}
