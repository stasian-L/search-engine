import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngxs/store';
import { Register } from '../../store/state/auth.actions';
import { EMPTY, catchError } from 'rxjs';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    fb = inject(FormBuilder);

    store = inject(Store);

    form: FormGroup = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    onSubmit(): void {
        const s = this.form.getRawValue();
        s;
        this.store.dispatch(new Register(s)).pipe(catchError(error => { console.log(error); return EMPTY; }))
    }
}
