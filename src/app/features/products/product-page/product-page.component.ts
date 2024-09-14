import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductEditComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product$: Observable<Product> | undefined;

  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const productId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getProduct(productId);
  }

  getProduct(id: number) {
    this.product$ = this.productsService.getById(id);
  }

  addProduct(product: Product) {
    this.productsService.add(product).subscribe(this.goToProductsPage);
  }

  updateProduct(product: Product) {
    this.productsService.update(product).subscribe(this.goToProductsPage);
  }

  deleteProduct(id: number) {
    this.productsService.delete(id).subscribe(this.goToProductsPage);
  }

  goToProductsPage = () => this.router.navigate(['/products']);
}