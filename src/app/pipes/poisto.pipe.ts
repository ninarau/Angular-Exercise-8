import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poisto'
})
export class PoistoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
