import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartService, ProductsService } from '../../../shared/services';

import { ProductModel, Sort } from '../../../models';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<ProductModel[]>;

  sort: Sort = {
    key: 'name',
    isAsc: true
  };

  constructor(
    private router: Router,
    public productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  onEditProduct(product: ProductModel): void {
    const link = ['/admin/product/edit', product.id];
    this.router.navigate(link);
  }

  onAddProduct(): void {
    const link = ['/admin/product/add'];
    this.router.navigate(link);
  }

  onToggleSort(key: string): void {
    if (this.sort.key === key) {
      return;
    }
    this.sort.key = key;
  }
}
