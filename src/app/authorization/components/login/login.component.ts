import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form: FormGroup;

    constructor(fb: FormBuilder, private authService: AuthService) {
        this.form = fb.nonNullable.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.authService.login(this.form.getRawValue())
    }
}
