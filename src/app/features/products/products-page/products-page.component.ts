import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from '../state/products.actions';
import { Observable } from 'rxjs';
import { selectProducts, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  products$!: Observable<Product[]>;
  total$!: Observable<number>;
  loading$!: Observable<boolean>;
  showProductCode$: any;
  errorMessage = '';

  private readonly _productsService = inject(ProductsService)
  private readonly _store = inject(Store)

  ngOnInit() {
    this._store.subscribe(store => console.log('store', store));
    this.showProductCode$ = this._store.select(selectProductsShowProductCode);
    this.loading$ = this._store.select(selectProductsLoading);
    this.products$ = this._store.select(selectProducts);
    this.products$ = this._store.select(selectProducts);
    this.total$ = this._store.select(selectProductsTotal);

    this.getProducts();
  }

  getProducts() {
    this._store.dispatch(ProductsPageActions.loadProducts());

    this._productsService.getAll().subscribe({
      next: (products) => {
        this._store.dispatch(ProductsAPIActions.productsLoadedSuccess({ products }));
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this._store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
