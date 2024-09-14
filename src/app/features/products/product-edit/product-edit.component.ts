import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  oldProduct: Product | null | undefined = null;

  @Output() add = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  @Input() set product(product: Product | null | undefined) {
    this.productForm.reset({ name: '', price: 0 });

    if (product && product.id !== 0) {
      this.productForm.setValue({
        name: product.name,
        price: product.price,
      });
    }

    this.oldProduct = product;
  }

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.min(0)),
  });

  onSubmit() {
    this.productForm.markAllAsTouched();

    if (this.productForm.invalid) return;

    const product = {
      id: this.oldProduct?.id ?? 0,
      name: this.productForm.value.name ?? '',
      price: this.productForm.value.price ?? 0,
    };

    this.oldProduct ? this.update.emit(product) : this.add.emit(product);
  }
}
