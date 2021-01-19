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
    // альтернативный вариант: немножко короче, но для понимания,
    // может быть сложнее
    ({ name: this.name,
       description: this.description,
       price: this.price,
       category: this.category,
       isAvailable: this.isAvailable
      } = this.product);
    // this.name = this.product.name;
    // this.description = this.product.description;
    // this.price = this.product.price;
    // this.category = this.product.category;
    // this.isAvailable = this.product.isAvailable;
  }
}
