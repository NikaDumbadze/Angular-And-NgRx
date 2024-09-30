import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _productsService = inject(ProductsService);

  loadProducts$ = createEffect(() => this._actions$.pipe(
    ofType(ProductsPageActions.loadProducts),
    exhaustMap(() =>
      this._productsService
        .getAll()
        .pipe(
          map(products =>
            ProductsAPIActions.productsLoadedSuccess({ products })
          ),
          catchError(error =>
            of(ProductsAPIActions.productsLoadedFail({ message: error }))
          )
        )
    )
  ));

  addProduct$ = createEffect(() => this._actions$.pipe(
    ofType(ProductsPageActions.addProduct),
    mergeMap(({ product }) =>
      this._productsService
        .add(product)
        .pipe(
          map(newProduct =>
            ProductsAPIActions.productAddedSuccess({ product: newProduct })
          ),
          catchError(error =>
            of(ProductsAPIActions.productAddedFail({ message: error }))
          )
        )
    )
  ));

  updateProduct$ = createEffect(() => this._actions$.pipe(
    ofType(ProductsPageActions.updateProduct),
    concatMap(({ product }) =>
      this._productsService
        .update(product)
        .pipe(
          map(() =>
            ProductsAPIActions.productUpdatedSuccess({ product })
          ),
          catchError(error =>
            of(ProductsAPIActions.productUpdatedFail({ message: error }))
          )
        )
    )
  ));

  deleteProduct$ = createEffect(() => this._actions$.pipe(
    ofType(ProductsPageActions.deleteProduct),
    mergeMap(({ id }) =>
      this._productsService
        .delete(id)
        .pipe(
          map(() => ProductsAPIActions.productDeletedSuccess({ id })),
          catchError(error =>
            of(ProductsAPIActions.productDeletedFail({ message: error }))
          )
        )
    )
  ));
}