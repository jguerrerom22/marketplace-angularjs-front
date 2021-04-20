import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args? : any): any {
    if (!args) {
      return value;
    }
    if (value) {
      return value.filter((val) =>{
        const rVal = (Object.values(val).some(x => (x) ? x.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()): false));
        return rVal;
      });
    }
  }

}
