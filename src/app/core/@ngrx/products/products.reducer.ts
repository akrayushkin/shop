import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
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
    const data = [...products];
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
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
    const data = [...state.data, { ...product }];
    const originalProduct = { ...product };
    return {
      ...state,
      data,
      originalProduct
    };
  }),
  on(ProductsActions.updateProduct, state => {
    console.log('UPDATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.updateProductSuccess, (state, { product }) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data];
    const index = data.findIndex(t => t.id === product.id);
    data[index] = { ...product };
    const originalProduct = { ...product };

    return {
      ...state,
      data,
      originalProduct
    };
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
    const data = state.data.filter(t => t.id !== product.id);
    return {
      ...state,
      data
    };
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
