**0.1.9 (2021.04.18)**
FEATURES:

- create an isolated unit test for ConfigOptionsService;
- create an isolated unit test for OrderByPipe;
- create a surface unit test for AppComponent;
- create an integration unit test for ProductComponent;
- create an integration unit test for ProductViewComponent;

**0.1.7 (2021.04.04)**
FEATURES:

- added to the project @ngrx / store, @ngrx/effect, @ngrx/router-store, @ngrx/entity
- added products state, products actions, products selectors, products reducer, products effects
- added cart state, cart actions, cart selectors, cart reducer, cart effects
- implemented navigation using the 'Go', 'Go Home', 'Forward', 'BACK'
- combined selector implemented to obtain data by parameter from URL GetProductByurl
- applies @ngrx/entity to products

REFACTORING:

- the corresponding components have changed to work with NGRX

BUGS:
- the basket cleaning method is not implemented.

**0.1.6 (2021.03.08)**
FEATURES:

- added json-server;
- create TimingInterceptor;
- create AppSettingsService;
- added Dark Theme

REFACTORING:

- changed ProductsService (added HttpClient, the methods are implemented according to the Promise scheme);
- changed CartService (added HttpClient, the methods are implemented using the Observable scheme);

BUGS:
- the basket cleaning method is not implemented.

**0.1.5 (2021.03.01)**
FEATURES:
- create ProductsRoutingModule;
- create ProductViewComponent;
- create AdminModule;
- create AdminRoutingModule;
- create AdminComponent;
- create AdminProductsComponent;
- create AdminOrdersComponent;
- create ManageProductComponent;
- create CartRoutingModulet;
- create HeaderMenuComponent;
- create OrdersModule;
- create OrdersRoutingModule;
- create OrdersComponent;
- create ProcessOrderComponent;
- create AuthGuard;
- create CanDeactivateGuard;
- create OrdersGuard;
- create ProductResolveGuard;
- create LoginComponent;
- create PathNotFoundComponent;
- create DialogService;

REFACTORING:
- AppModule;
- AppRoutingModule;
- ProductsModule;
- ProductComponent;
- ProductListComponent;
- ProductsService;
- CartModule;
- CartService;
- CartComponent;
- CartListComponent;
- СartItemComponent;
- FirstComponent;
- productsMock(addImage);
- ProductsService;

**0.1.4 (2021.02.07)**
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


**0.1.3 (2021.01.31)**
FEATURES:

- create ConfigOptionsService;
- create ConstantsService;
- create GeneratorService;
- create LocalStorageService;
- create FontSizeDirective;

REFACTORING:

- CartService;

**0.1.2 (2021.01.28)**
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

**0.1.1 (2021.01.17)**

FEATURES:

- create ProductComponent;
- create ProductListComponent;
- create ProductsService;
- create CartListComponent;
- create CartService;
- when you click the "add to cart" button, add the product to the cart. If there is already such a product in the basket, increase the quantity;
