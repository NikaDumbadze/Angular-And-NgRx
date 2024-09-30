import { Component, inject } from '@angular/core';
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

  private readonly _productsService =  inject(ProductsService);
  private readonly _router =  inject(Router);
  private readonly _activatedRoute =  inject(ActivatedRoute);

  ngOnInit() {
    const productId = parseInt(this._activatedRoute.snapshot.params['id']);
    this.getProduct(productId);
  }

  getProduct(id: number) {
    this.product$ = this._productsService.getById(id);
  }

  addProduct(product: Product) {
    this._productsService.add(product).subscribe(this.goToProductsPage);
  }

  updateProduct(product: Product) {
    this._productsService.update(product).subscribe(this.goToProductsPage);
  }

  deleteProduct(id: number) {
    this._productsService.delete(id).subscribe(this.goToProductsPage);
  }

  goToProductsPage = () => this._router.navigate(['/products']);
}