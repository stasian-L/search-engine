import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile-image',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './profile-image.component.html',
    styleUrl: './profile-image.component.scss'
})
export class ProfileImageComponent {
    fb = inject(FormBuilder);

    cdr = inject(ChangeDetectorRef);

    form = this.fb.nonNullable.group({
        userPhoto: ['']
    });

    imageUrl: any = '../assets/images/user.jpg';

    @ViewChild('fileInput') el: ElementRef | undefined;
    editFile: boolean = true;
    removeUpload: boolean = false;

    uploadFile(event: any) {
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.imageUrl = reader.result;
                this.form.patchValue({
                    file: reader.result
                });
                this.editFile = false;
                this.removeUpload = true;
            };
            // ChangeDetectorRef since file is loading outside the zone
            this.cdr.markForCheck();
        }
    }
}
