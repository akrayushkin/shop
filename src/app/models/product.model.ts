export enum Categorys {
  smartphones = 'смартфоны',
  computers = 'комьютеры',
  tvs = 'телевизоры',
  dishes = 'посуда',
  stationery = 'канцтовары'
}

export interface ProductModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: Categorys;
  readonly isAvailable: boolean;
  readonly quantity?: number;
  readonly imageURL?: string;
}

export class Product implements ProductModel {
  constructor(
    public id: number = null,
    public name: string = '',
    public description: string = '',
    public price: number = null,
    public category: Categorys = null,
    public isAvailable: boolean = true,
    public quantity: number = null,
    public imageURL: string = ''
  ) {}
}
