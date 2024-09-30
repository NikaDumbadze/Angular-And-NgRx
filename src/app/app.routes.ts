import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    children: [
      { path: '', loadComponent: () => import('./features/products/products-page/products-page.component').then(m => m.ProductsPageComponent) },
      { path: ':id', loadComponent: () => import('./features/products/product-page/product-page.component').then(m => m.ProductPageComponent) }
    ]
  }
];