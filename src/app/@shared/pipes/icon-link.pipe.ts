import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iconLink',
    standalone: true
})
export class IconLinkPipe implements PipeTransform {
    transform(value: string): string {
        const domain = new URL(value);
        return `https://www.google.com/s2/favicons?domain=${domain}`;
    }
}
