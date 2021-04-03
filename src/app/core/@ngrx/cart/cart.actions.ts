import { createAction, props } from '@ngrx/store';

import { ProductModel } from './../../../models';

export const getCartProducts = createAction('[Cart Page (App)] GET_CART_PRODUCTS');
export const getCartProductsSuccess = createAction(
  '[Get Cart Products Effect] GET_CART_PRODUCTS_SUCCEESS',
  props<{ products: ProductModel[] }>()
);
export const getCartProductsError = createAction(
  '[Get Cart Products Effect] GET_CART_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const addCartProduct = createAction(
  '[Product List Page / Product View Page] ADD_CART_PRODUCT',
  props<{ product: ProductModel }>()
);
export const addCartProductSuccess = createAction(
  '[Add Cart Product Effect] ADD_CART_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);
export const addCartProductError = createAction(
  '[Add Cart Product Effect] ADD_CART_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateCartProduct = createAction(
  '[Cart Page / Product List Page / Product View Page] UPDATE_CART_PRODUCT',
  props<{ product: ProductModel }>()
);
export const updateCartProductSuccess = createAction(
  '[Update Cart Product Effect] UPDATE_CART_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);
export const updateCartProductError = createAction(
  '[Update Cart Product Effect] UPDATE_CART_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const deleteCartProduct = createAction(
  '[Cart Page] DELETE_CART_PRODUCT',
  props<{ product: ProductModel }>()
);
export const deleteCartProductSuccess = createAction(
  '[Delete Cart Product Effect] DELETE_CART_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);
export const deleteCartProductError = createAction(
  '[Delete Cart Product Effect] DELETE_CART_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);
