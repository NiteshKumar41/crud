import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure:false,
  })
export class FilterPipe implements PipeTransform {
    transform(items: any[], search: string): any[] {
        if (!items) return [];
        if (!search) return items;
        return items.filter(item => {
          return this.filterObject(item,search)
        });
       }
    
       filterObject(item,search){
        return Object.keys(item).some(key => {
          
          return String(item[key]).toLowerCase().includes(search.toLowerCase());
        });
       }
}