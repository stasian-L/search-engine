import { Login } from './../../store/state/auth.actions';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form: FormGroup;

    constructor(fb: FormBuilder, protected store: Store) {
        this.form = fb.nonNullable.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.store.dispatch(new Login(this.form.getRawValue()));
    }
}
