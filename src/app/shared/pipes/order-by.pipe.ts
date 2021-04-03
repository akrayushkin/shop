import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from '../../utils';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    value: Record<string, any>[],
    key: string,
    isAsc: boolean = false
  ): Record<string, any>[] {
    if (value && value.length > 1) {
      return value.slice().sort(this.byField(key, isAsc));
    }
    return value;
  }

  byField(field: string, isAsc: boolean): (
    a: Record<string, any>,
    b: Record<string, any>
  ) => number {
    return (a: Record<string, any>, b: Record<string, any>) => {
      let one = a[field];
      let two = b[field];
      if (!isNumber(one) && !isNumber(two)) {
        one = String(one).toLowerCase();
        two = String(two).toLowerCase();
      }
      if (one === two) {
        return 0;
      }
      if (isAsc) {
        return one > two ? 1 : -1;
      }
      return one < two ? 1 : -1;
    };
  }
}
