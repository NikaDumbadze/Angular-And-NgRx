import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ product: Product }>(),
  },
});

export const ProductsAPIActions = createActionGroup({
  source: "Products API",
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Fail': props<{ message: string }>(),

    'Product Added Success': props<{ products: Product[] }>(),
    'Product Added Fail': props<{ message: string }>(),

    'Product Updated Success': props<{ products: Product[] }>(),
    'Product Updated Fail': props<{ message: string }>(),
    
    'Product Delete Success': props<{ products: Product[] }>(),
    'Product Delete Fail': props<{ message: string }>(),
  }
})