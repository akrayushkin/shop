import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, ProductResolveGuard, CanDeactivateGuard } from './../core';

import { AdminComponent } from './admin.component';
import { AdminProductsComponent, AdminOrdersComponent, ManageProductComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'product/add', component: ManageProductComponent },
          {
            path: 'product/edit/:productID',
            component: ManageProductComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductResolveGuard
            }
          },
          { path: 'orders', component: AdminOrdersComponent },
          { path: 'products', component: AdminProductsComponent },
          {
            path: '',
            redirectTo: 'products',
            pathMatch: 'full'
          },
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    AdminProductsComponent,
    ManageProductComponent
  ];
}
