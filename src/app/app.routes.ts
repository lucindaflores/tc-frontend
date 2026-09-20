import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Product } from './product/product';
import { ProductDetail } from './product-detail/product-detail';
import {Cart} from './cart/cart';

export const routes: Routes = [
  {
    path: '', //  opens Home
    component: Home
  },
  {
    path: 'products',
    component: Product
  },
  {
    path: 'products/:id',
    component: ProductDetail
  },
  {
    path: 'cart',
    component: Cart
  }

  ];
