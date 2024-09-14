import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode$: any;
  errorMessage = '';

  constructor(
    private readonly productsService: ProductsService,
    private readonly store: Store
  ) {
    this.store.subscribe(store => console.log('store', store));
    this.showProductCode$ = this.store.select((state: any) => state.products.showProductCode);
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch({ type: '[Products Page] Toggle Show Product Code' });
  }
}
