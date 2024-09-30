import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsAPIUrl = 'api/products';

  private readonly _http =  inject(HttpClient)

  getAll() {
    return this._http
      .get<Product[]>(this.productsAPIUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number) {
    return this._http
      .get<Product>(`${this.productsAPIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add({ name, price }: Product) {
    return this._http
      .post<Product>(this.productsAPIUrl, { name, price })
      .pipe(catchError(this.handleError));
  }

  update(product: Product) {
    return this._http
      .put<Product>(this.productsAPIUrl, product)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    const url = `${this.productsAPIUrl}/${id}`;
    return this._http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
