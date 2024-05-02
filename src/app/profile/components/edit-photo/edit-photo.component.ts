import { Component, HostBinding, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-edit-photo',
    standalone: true,
    imports: [],
    templateUrl: './edit-photo.component.html',
    styleUrl: './edit-photo.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditPhotoComponent),
            multi: true
        }
    ]
})
export class EditPhotoComponent implements ControlValueAccessor {
    imageUrl = '';

    onChange: (value: string) => void = () => {};
    onTouched: Function = () => {};

    @HostBinding('class.disabled')
    isDisabled = false;

    writeValue(value: string) {
        this.imageUrl = value || '';
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean) {
        this.isDisabled = disabled;
    }
}
