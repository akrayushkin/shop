import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersGuard, AuthGuard } from './core';
import { PathNotFoundComponent, LoginComponent } from './layout';

const routes: Routes = [
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'order',
    canLoad: [OrdersGuard],
    loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
