import { CartState } from './cart';
import { ProductsState } from './products';

export interface AppState {
  products: ProductsState;
  cart: CartState;
}
