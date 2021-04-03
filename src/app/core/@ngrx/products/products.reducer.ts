import { Action, createReducer, on } from '@ngrx/store';

import { adapter, ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.getProducts, state => {
    console.log('GET_PRODUCTS action being handled!');
    return {
      ...state,
      loading: true
    }
  }),
  on(
    ProductsActions.getProductsSuccess,
    ProductsActions.getProductsAdminSuccess,
    (state, { products }) => {
    console.log('GET_PRODUCTS(_ADMIN)_SUCCESS action being handled!');
    return adapter.setAll(products, {...state, loading: false, loaded: true });
  }),
  on(
    ProductsActions.getProductsError,
    ProductsActions.getProductsAdminError,
    (state, { error }) => {
      console.log('GET_PRODUCTS(_ADMIN)/PRODUCT_ERROR action being handled!');
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
  ),
  on(ProductsActions.createProduct, state => {
    console.log('CREATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.createProductSuccess, (state, { product }) => {
    console.log('CREATE_PRODUCT_SUCCESS action being handled!');
    const originalProduct = { ...product };
    return adapter.addOne(product, {...state, originalProduct});
  }),
  on(ProductsActions.updateProduct, state => {
    console.log('UPDATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.updateProductSuccess, (state, { product }) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    const originalProduct = { ...product };
    return adapter.updateOne({ id: product.id, changes: product }, {...state, originalProduct});
  }),
  on(
    ProductsActions.createProductError,
    ProductsActions.updateProductError,
    ProductsActions.deleteProductError,
    (state, { error }) => {
    console.log('CREATE/UPDATE/DELETE_PRODUCT_ERROR action being handled!');
    return {
      ...state,
      error
    };
  }),
  on(ProductsActions.getProductsAdmin, state => {
    console.log('GET_PRODUCTS_ADMIN action being handled!');
    return { ...state };
  }),
  on(ProductsActions.deleteProduct, state => {
    console.log('DELETE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.deleteProductSuccess, (state, { product }) => {
    console.log('DELETE_TASK_SUCCESS action being handled!');
    return adapter.removeOne(product.id, state);
  }),
  on(ProductsActions.setOriginalProduct, (state, { product }) => {
    const originalProduct = { ...product };
    return {
      ...state,
      originalProduct
    };
  })

);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
