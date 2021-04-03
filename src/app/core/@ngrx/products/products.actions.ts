import { createAction, props } from '@ngrx/store';

import { ProductModel } from './../../../models/product.model';

export const getProducts = createAction('[Product List Page (App)] GET_PRODUCTS');
export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
  props<{ products: ProductModel[] }>()
);
export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const createProduct = createAction(
  '[Create Manage Product Form Page] CREATE_PRODUCT',
  props<{ product: ProductModel }>()
);
export const createProductSuccess = createAction(
  '[Create Product Effect] CREATE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);
export const createProductError = createAction(
  '[Create Product Effect] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateProduct = createAction(
  '[Update Manage Product Form Page] UPDATE_PRODUCT',
  props<{ product: ProductModel }>()
);
export const updateProductSuccess = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);
export const updateProductError = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const getProductsAdmin = createAction('[Admin Product Page (App)] GET_PRODUCTS');
export const getProductsAdminSuccess = createAction(
  '[Get Products Admin Effect] GET_PRODUCTS_SUCCEESS',
  props<{ products: ProductModel[] }>()
);
export const getProductsAdminError = createAction(
  '[Get Products Admin Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const deleteProduct = createAction(
  '[Admin Product Page] DELETE_PRODUCT',
  props<{ product: ProductModel }>()
);
export const deleteProductSuccess = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);
export const deleteProductError = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const setOriginalProduct = createAction(
  '[Manage Product Form Page (App)] SET_ORIGINAL_PRODUCT',
  props<{ product: ProductModel }>()
);
