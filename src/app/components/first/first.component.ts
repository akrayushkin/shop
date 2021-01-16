import { Component, OnInit } from '@angular/core';

enum Categorys {
  smartphones = 'SMARTPHONES',
  computers = 'COMPUTERS',
  tvs = 'TVs',
  dishes = 'DISHES',
  stationery = 'STATIONERY'
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  name: string;
  description: string;
  price: number;
  category: Categorys;
  isAvailable: boolean;

  constructor() {}

  ngOnInit(): void {
    this.name = 'notebook';
    this.description = 'portable personal computer';
    this.price = 1000;
    this.category = Categorys.computers;
    this.isAvailable = true;
  }
}
