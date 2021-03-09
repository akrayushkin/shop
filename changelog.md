Deploy: https://akrayushkin-angular-shop.netlify.app/

**0.1.6 (2020.03.08)**
FEATURES:

- added json-server;
- create TimingInterceptor;
- create AppSettingsService;
- added Dark Theme

REFACTORING:

- changed ProductsService (added HttpClient, the methods are implemented according to the Promise scheme);
- changed CartService (added HttpClient, the methods are implemented using the Observable scheme);

BUGS:

- CartService используется в нескольких компонентах: CartListComponent, HeaderMenuComponent, ProductListComponent, ProductViewComponent и OrdersGuard, поэтому, логично использовать едииный state для корзины. В качаестве state, была создана переменная cartProducts внутри CartService. При создании сервиса создается подписка на метод получения всех продуктов корзины fetchAllProducts, внутри подписки идет присвоение респонса, переменной cartProducts, но присвоение происходит единожды. Т.е. изменения, которые происходят с помощью других методов CartService в базе данных на серевере, можно увидеть только после перезагрузки страницы. Пока не разобрался с проблемой, планирую решить при переводе работы приложения на NgRx.
- Не смог реализовать метод очистки корзины. Созданный метод removeAllProducts, для удаления всех записей на сервере, работает не правильно.

**0.1.5 (2020.03.01)**
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
