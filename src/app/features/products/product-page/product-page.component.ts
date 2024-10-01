import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { selectProductById, selectProductsLoading } from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductEditComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly _store = inject(Store);

  product$ = this._store.select(selectProductById);
  loading$ = this._store.select(selectProductsLoading);

  addProduct(product: Product) {
    this._store.dispatch(ProductsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this._store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this._store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }
}