import {Component, inject } from '@angular/core';
import { CartService } from './cart-service';
import {Stepper} from '../product-detail/stepper/stepper';
import {RouterLink} from '@angular/router';


@Component({
  imports: [
    Stepper,
    RouterLink
  ],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {

  protected readonly cartService = inject(CartService);

  /* Updates the quantity in the stepper */
  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

}
