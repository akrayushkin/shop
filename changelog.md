Deploy: https://akrayushkin-angular-shop.netlify.app/

**0.1.4 (2020.02.07)**
FEATURES:

- used uppercase pipe in components: cart-item.component (product name), product.component (product name and product category);
- used pipe currency in components: cart-item.component (product price), cart-list.component (total sum);
- used async pipe in component: product-list.component (get products);
- create OrderByPipe;
- used pipe orderBy in the component: cart-list.component (cart products);
- added the ability to sort in the columns of the cart-list component table: name, cost and quantity;

REFACTORING:

- ProductsService;
- CartListComponent (template);


**0.1.3 (2020.01.31)**
FEATURES:

- create ConfigOptionsService;
- create ConstantsService;
- create GeneratorService;
- create LocalStorageService;
- create FontSizeDirective;

REFACTORING:

- CartService;

**0.1.2 (2020.01.28)**
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

**0.1.1 (2020.01.17)**

FEATURES:

- create ProductComponent;
- create ProductListComponent;
- create ProductsService;
- create CartListComponent;
- create CartService;
- when you click the "add to cart" button, add the product to the cart. If there is already such a product in the basket, increase the quantity;
