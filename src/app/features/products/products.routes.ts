import { Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsPageComponent
  },
  {
    path: ':id',
    component: ProductPageComponent
  }
];
