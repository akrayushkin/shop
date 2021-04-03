import { ProductModel } from '../../../models/product.model';

export interface CartState {
  readonly entities: { [id: number]: ProductModel };
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialCartState: CartState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
};
