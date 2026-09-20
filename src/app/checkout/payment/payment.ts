import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {OrderService} from './order-service';
import {CartService} from '../../cart/cart-service';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [
    RouterLink,
    FormsModule
  ],
  selector: 'app-payment',
  styleUrl: './payment.css',
  templateUrl: './payment.html',
})
export class Payment {

  private orderService = inject(OrderService);
  private router = inject(Router);
  private cartService = inject(CartService);

  async finishOrder() {

    const savedUser = sessionStorage.getItem('checkoutUser');
    const savedAddress = sessionStorage.getItem('checkoutAddress');

    if (!savedUser || !savedAddress) {
      return;
    }

    const user = JSON.parse(savedUser);
    const address = JSON.parse(savedAddress);

    const orderDetails = [];
    for (const item of this.cartService.items()) {
      orderDetails.push({
        quantity: item.quantity,
        productId: item.product.id
      });

    }

    const newOrder = {
      userId: user.userId,
      addressId: address.addressId,
      orderDetails: orderDetails
    };

    try {
      const orderId = await this.orderService.create(newOrder);

      sessionStorage.removeItem('checkoutUser');
      sessionStorage.removeItem('checkoutAddress');

      this.cartService.clear();

      await this.router.navigate(['/checkout/ready']);

    } catch (error) {
      console.error('The order was not created. ERROR:', error);
    }
  }
}
