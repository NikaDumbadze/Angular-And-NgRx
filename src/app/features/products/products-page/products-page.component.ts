import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from '../state/products.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  products$!: Observable<Product[]>;
  total = 0;
  loading$!: Observable<boolean>;
  showProductCode$: any;
  errorMessage = '';

  constructor(
    private readonly productsService: ProductsService,
    private readonly store: Store
  ) {
    this.store.subscribe(store => console.log('store', store));
    this.showProductCode$ = this.store.select((state: any) => state.products.showProductCode);
    this.loading$ = this.store.select((state: any) => state.products.loading);
    this.products$ = this.store.select((state: any) => state.products.products);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts());

    this.productsService.getAll().subscribe({
      next: (products) => {
        this.store.dispatch(ProductsAPIActions.productsLoadedSuccess({ products }));
        this.total = sumProducts(products);
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
