import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductComponent } from './product.component';
import { productsMock } from '../../../mocks/products.mock';
import { ProductModel } from '../../../models';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productInfoLinkEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    });

    // Arrange
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    // Act
    component.product = productsMock[0];

    // Запускаем обнаружение изменений для первоначальной привязки данных
    fixture.detectChanges();

    productInfoLinkEl = fixture.debugElement.query(By.css('a.product__info-title-link'));
    const expectedPipedName = productsMock[0].name.toUpperCase();

    // Assert
    expect(productInfoLinkEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let viewedProduct: ProductModel;
    // Act
    component.product = productsMock[0];
    fixture.detectChanges();

    productInfoLinkEl = fixture.debugElement.query(By.css('a.product__info-title-link'));
    // viewProduct - sync Observable
    component.viewProduct.subscribe((product: ProductModel) => (viewedProduct = product));

    productInfoLinkEl.triggerEventHandler('click', null);
    // Assert
    expect(viewedProduct).toBe(productsMock[0]);
  });

});
