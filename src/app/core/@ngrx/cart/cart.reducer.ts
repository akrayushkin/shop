import { Action, createReducer, on } from '@ngrx/store';

import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';
import { ProductModel } from './../../../models';

const reducer = createReducer(
  initialCartState,
  on(CartActions.getCartProducts, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(CartActions.getCartProductsSuccess, (state,{ products }) => {
    const data = [...products];
    const entities = data.reduce(
      (result: { [id: number]: ProductModel }, product: ProductModel) => {
        return {
          ...result,
          [product.id]: product
        };
      },
      {
        ...state.entities
      }
    );
    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  }),
  on(CartActions.getCartProductsError, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
  on(
    CartActions.addCartProductSuccess,
    CartActions.updateCartProductSuccess,
    (state, { product }) => {
    const addedUpdatedProduct = { ...product };
    const entities = {
      ...state.entities,
      [addedUpdatedProduct.id]: addedUpdatedProduct
    };
    return {
      ...state,
      entities
    };
  }),
  on(
    CartActions.addCartProductError,
    CartActions.updateCartProductError,
    CartActions.deleteCartProductError,
    (state, { error }) => {
      return {
        ...state,
        error
      };
    }
  ),
  on(CartActions.deleteCartProductSuccess, (state, { product }) => {
    const { [product.id]: removed, ...entities } = state.entities;
    return {
      ...state,
      entities
    };
  })
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return reducer(state, action);
}
