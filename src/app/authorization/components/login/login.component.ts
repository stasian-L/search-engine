import { CommonModule } from '@angular/common';
import { Login } from './../../store/state/auth.actions';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    fb = inject(FormBuilder);

    store = inject(Store);

    form: FormGroup = this.fb.nonNullable.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });;

    onSubmit(): void {
        this.store.dispatch(new Login(this.form.getRawValue()));
    }
}
