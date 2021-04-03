import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';

// @NgRx
import { Store } from '@ngrx/store';
import { selectSelectedProductByUrl, selectOriginalProduct } from './../../../core/@ngrx';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { CanComponentDeactivate } from './../../../core';
import { DialogService } from '../../../shared/services';
import { ProductModel } from '../../../models';

@Component({
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, CanComponentDeactivate, OnDestroy  {
  destroy$: Subject<void>  = new Subject<void>();
  product: ProductModel;

  constructor(
    private dialogService: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const observer: any = {
      next: (product: ProductModel) => {
        this.product = {...product};
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store.select(selectSelectedProductByUrl)
          .pipe(takeUntil(this.destroy$))
          .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = [];

    return this.store.select(selectOriginalProduct).pipe(
      switchMap((originalProduct: ProductModel) => {
        for (const key in originalProduct) {
          if (originalProduct[key] === this.product[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        }

        if (flags.every(el => el)) {
          return of(true);
        }

        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
      })
    );
  }

  onSaveProduct(): void {
    const product = { ...this.product } as ProductModel;

    if (product.id) {
      this.store.dispatch(ProductsActions.updateProduct({ product }));
    } else {
      this.store.dispatch(ProductsActions.createProduct({ product }));
    }
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.back());
  }
}
