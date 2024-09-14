import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(r => r.PRODUCT_ROUTES)
  }
];
