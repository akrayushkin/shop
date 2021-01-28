export enum Categorys {
  smartphones = 'СМАРТФОНЫ',
  computers = 'КОМЬЮТЕРЫ',
  tvs = 'ТЕЛЕВИЗОРЫ',
  dishes = 'ПОСУДА',
  stationery = 'КАНЦТОВАРЫ'
}

export interface ProductModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: Categorys;
  readonly isAvailable: boolean;
  readonly quantity?: number;
}
