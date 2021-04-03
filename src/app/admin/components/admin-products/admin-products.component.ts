import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

// @NgRx
import { Store } from '@ngrx/store';
import { selectProductsData, selectProductsError } from './../../../core/@ngrx';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { ProductModel, Sort } from '../../../models';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<ReadonlyArray<ProductModel>>;
  productsError$: Observable<Error | string>;


  sort: Sort = {
    key: 'name',
    isAsc: true
  };

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.getProductsAdmin());
    this.products$ = this.store.select(selectProductsData);
    this.productsError$ = this.store.select(selectProductsError);
  }

  onEditProduct(product: ProductModel): void {
    const link = ['/admin/product/edit', product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }

  onDeleteProduct(product: ProductModel): void {
    const productToDelete: ProductModel = { ...product };
    this.store.dispatch(ProductsActions.deleteProduct({ product: productToDelete }));
  }

  onAddProduct(): void {
    const link = ['/admin/product/add'];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }

  onToggleSort(key: string): void {
    if (this.sort.key === key) {
      return;
    }
    this.sort.key = key;
  }
}
