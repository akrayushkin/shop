import { Component, Input, OnInit } from '@angular/core';

import { Categorys, ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  @Input() product: ProductModel;

  name: string;
  description: string;
  price: number;
  category: Categorys;
  isAvailable: boolean;

  constructor() {}

  ngOnInit(): void {
    this.name = this.product.name;
    this.description = this.product.description;
    this.price = this.product.price;
    this.category = this.product.category;
    this.isAvailable = this.product.isAvailable;
  }
}
