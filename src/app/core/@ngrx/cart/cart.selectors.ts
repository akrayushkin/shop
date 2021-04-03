import { addCartProductSuccess } from './cart.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../app.state';
import { CartState } from './cart.state';
import { ProductModel, Product } from './../../../models';
import { selectRouterState } from './../router/router.selectors';

const selectEntities = (state: CartState) => state.entities;
const selectLoaded = (state: CartState) => state.loaded;
const selectLoading = (state: CartState) => state.loading;
const selectError = (state: CartState) => state.error;

export const selectCartState = createFeatureSelector<AppState, CartState>('cart');

const selectCartEntitites = createSelector(
  selectCartState,
  selectEntities
);
export const selectCartLoaded = createSelector(
  selectCartState,
  selectLoaded
);
export const selectCartLoading = createSelector(
  selectCartState,
  selectLoading
);
export const selectCartError = createSelector(
  selectCartState,
  selectError
);

/**
 * transform object to array
 */
export const selectCartProducts = createSelector(
  selectCartEntitites,
  entities => {
    return Object.keys(entities).map(id => entities[+id]);
  }
);

export const selectCartProductByID = createSelector(
  selectCartEntitites,
  (entities, props: any)  => {
    if (props && props.id) {
      return entities[props.id] || null;
    } else {
      return null;
    };
  }
);

export const selectIsNotEmptyCart = createSelector(
  selectCartEntitites,
  entities => entities && Object.keys(entities).length !== 0
);

export const selectCartTotalSum = createSelector(
  selectCartProducts,
  products => {
    return products.reduce(
      (sum, current) => sum + current.price,
      0
    );
  }
);

export const selectCartTotalQuantity = createSelector(
  selectCartProducts,
  products => {
    return products.reduce(
      (sum, current) => sum + current.quantity,
      0
    );
  }
);

export const selectSelectedCartProductByUrl = createSelector(
  selectCartEntitites,
  selectRouterState,
  (cartProducts, router): ProductModel => {
    const productID = router.state.params.productID;
    if (productID && cartProducts) {
      return addCartProductSuccess[productID];
    } else {
      return new Product();
    }
  }
);
