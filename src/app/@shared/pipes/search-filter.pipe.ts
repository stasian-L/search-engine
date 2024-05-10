import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class SearchFilterPipe implements PipeTransform {
    transform(data: any[], filterProperty: string, filter: string): any[] {
        const filterValue = filter.toLowerCase();
        return filterValue ? data.filter(item => item[filterProperty].toLowerCase().includes(filterValue)) : data;
    }
}
