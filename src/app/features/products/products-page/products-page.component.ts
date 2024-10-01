import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  private readonly _store = inject(Store)

  products$ = this._store.select(selectProducts);
  total$ = this._store.select(selectProductsTotal);
  loading$ = this._store.select(selectProductsLoading);
  showProductCode$ = this._store.select(selectProductsShowProductCode);
  errorMessage$ = this._store.select(selectProductsErrorMessage);

  ngOnInit() {
    this._store.subscribe(store => console.log('store', store));
  }

  toggleShowProductCode() {
    this._store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
