import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './../app.state';
import { adapter, ProductsState } from './products.state';

import { selectRouterState } from './../router';
import { Product, ProductModel } from './../../../models';

export const selectProductsState = createFeatureSelector<AppState, ProductsState>('products');

export const {
  selectEntities: selectProductsEntities,
  selectAll: selectProductsData
} = adapter.getSelectors(selectProductsState);

export const selectOriginalProduct = createSelector(selectProductsState, (state: ProductsState) => state.originalProduct);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);

export const selectSelectedProductByUrl = createSelector(
  selectProductsEntities,
  selectRouterState,
  (products, router): ProductModel => {
      const productID = router.state.params.productID;
      if (productID) {
          return products[productID] as Product;
      } else {
          return new Product();
      }
});
