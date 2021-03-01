import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CanComponentDeactivate } from './../../../core';
import { DialogService } from '../../../shared/services';

// rxjs
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ProductModel } from '../../../models';
import { ProductsService } from './../../../shared/services/products.service';

@Component({
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, CanComponentDeactivate  {
  product: ProductModel;
  originalProduct: ProductModel;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = { ...product };
      this.originalProduct = { ...product };
    });
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originalProduct).map(key => {
      if (this.originalProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }


  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.createProduct({...product, id: Date.now(), isAvailable: true});
    }
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
