import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Store } from '@ngrx/store';
import { defer, of } from 'rxjs';

import { ProductViewComponent } from './product-view.component';
import { productsMock } from '../../../mocks/products.mock';
import { CartService } from '../../../shared/services';

const cartServiceMock = {
  getIncreaseQuantityProduct: () => productsMock[0]
}

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;

  let selectProductAsObservableSpy: jasmine.Spy;
  let deProductName: DebugElement;
  let elProductName: HTMLElement;

  beforeEach(() => {
    const productSpyObj = jasmine.createSpyObj('Store', ['select']);
    // Act
    selectProductAsObservableSpy = productSpyObj.select.and.returnValue(
      defer(() => of(productsMock[0]))
    );

    TestBed.configureTestingModule({
      declarations: [ ProductViewComponent ],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: Store, useValue: productSpyObj }
      ],
    })
    // Arrange
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;

    deProductName = fixture.debugElement.query(By.css('.info__title'));
    elProductName = deProductName.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show product name', async () => {
    fixture.detectChanges(); // ngOnInit()

    await fixture.whenStable();

    fixture.detectChanges();
    // Assert
    expect(elProductName.textContent).toBe(productsMock[0].name, 'Product is displayed');
  });
});
