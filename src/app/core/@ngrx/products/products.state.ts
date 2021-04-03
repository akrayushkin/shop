import { ProductModel } from '../../../models/product.model';

export interface ProductsState {
  readonly data: ProductModel[];
  readonly originalProduct: ProductModel;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
  data: [],
  originalProduct: null,
  loading: false,
  loaded: false,
  error: null
};
