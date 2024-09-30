import { Component } from '@angular/core';
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

  constructor(
    private readonly productsService: ProductsService,
    private readonly store: Store
  ) {
    this.store.subscribe(store => console.log('store', store));
    this.showProductCode$ = this.store.select(selectProductsShowProductCode);
    this.loading$ = this.store.select(selectProductsLoading);
    this.products$ = this.store.select(selectProducts);
    this.products$ = this.store.select(selectProducts);
    this.total$ = this.store.select(selectProductsTotal);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts());

    this.productsService.getAll().subscribe({
      next: (products) => {
        this.store.dispatch(ProductsAPIActions.productsLoadedSuccess({ products }));
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
