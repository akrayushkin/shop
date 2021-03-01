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
