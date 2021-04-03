import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './../app.state';
import { ProductsState } from './products.state';

import { selectRouterState } from './../router';
import { Product, ProductModel } from './../../../models';

export const selectProductsState = createFeatureSelector<AppState, ProductsState>('products');

export const selectProductsData = createSelector(selectProductsState, (state: ProductsState) => state.data);
export const selectOriginalProduct = createSelector(selectProductsState, (state: ProductsState) => state.originalProduct);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

export const selectProductsDataPartial = createSelector(
  selectProductsState,
  (state: ProductsState, props: any) => {
    if (props && props.count) {
      return state.data.slice(0, props.count);
    } else {
      return state.data;
    }
  }
);

export const selectSelectedProductByUrl = createSelector(
  selectProductsData,
  selectRouterState,
  (products, router): ProductModel => {
      const productID = router.state.params.productID;
      if (productID && Array.isArray(products)) {
          return products.find(product => product.id === +productID);
      } else {
          return new Product();
      }
});
