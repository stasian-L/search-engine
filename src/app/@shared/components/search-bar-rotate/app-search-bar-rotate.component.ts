import { animate, state, style, transition, trigger } from '@angular/animations';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    standalone: true,
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule],
    selector: 'app-search-bar-rotate',
    templateUrl: 'app-search-bar-rotate.component.html',
    styleUrls: ['app-search-bar-rotate.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('true', style({ width: '100%' })),
            state('false', style({ width: '0' })),
            transition('true => false', animate('300ms ease-in')),
            transition('false => true', animate('300ms ease-out'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarRotateComponent implements OnInit {
    private readonly destroyRef = inject(DestroyRef);

    @ViewChild('input') inputElement!: ElementRef;

    @Input() appearance: 'fill' | 'outline' = 'outline';

    @Output() searchChange = new EventEmitter<string | null>();

    searchControl = new FormControl('');

    @HostBinding('class.opened')
    isOpened = false;

    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe(x => this.searchChange.emit(x));
    }

    onClose(): void {
        this.searchControl.reset('');
        this.isOpened = false;
    }

    onOpen(): void {
        this.isOpened = true;
        this.inputElement.nativeElement.focus();
    }
}
