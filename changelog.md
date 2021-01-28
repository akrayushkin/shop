Deploy: https://akrayushkin-angular-shop.netlify.app/

**0.1.1 (2020.01.28)**
FEATURES:

- create CartModule;
- create ProductsModule;
- create SharedModule;
- implemented features: change the quantity of the product (increase/decrease), remove the product from the basket.
- added `<h1>` to the AppComponent markup. Used @ViewChild to access it and set the value
- create HighlightDirective

REFACTORING:

- ProductListComponent;
- ProductComponent;
- CartService;
- CartListComponent;
- СartItemComponent;

**0.1.0 (2020.01.17)**

FEATURES:

- create ProductComponent;
- create ProductListComponent;
- create ProductsService;
- create CartListComponent;
- create CartService;
- when you click the "add to cart" button, add the product to the cart. If there is already such a product in the basket, increase the quantity;
