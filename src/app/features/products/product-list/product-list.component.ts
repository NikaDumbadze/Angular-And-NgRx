import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() products: Product[] | null = [];
  @Input() total: number | null = 0;
  @Input() showProductCode: boolean | null = false;

  @Output() toggleProductCode = new EventEmitter<void>();
}
