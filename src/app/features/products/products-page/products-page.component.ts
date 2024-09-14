import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductListComponent } from '../product-list/product-list.component';

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
  showProductCode = false;
  errorMessage = '';

  constructor(private readonly productsService: ProductsService) { }

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
    this.showProductCode = !this.showProductCode;
  }
}
