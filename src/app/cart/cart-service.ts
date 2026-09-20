import {Service, signal} from '@angular/core';
import { CartModel } from './cart-model';
import { ProductModel } from '../product/product-model';

@Service()
export class CartService {

  private readonly cartItems = signal<CartModel[]>([]);
  private readonly cartOpen = signal(false);

  items = this.cartItems.asReadonly();

  add(product: ProductModel, quantity: number) {
    //Gets current cart
    const items = [...this.cartItems()];

    let existingIndex = -1;

    // Search the product in the items in the card if exists, saves the current index of the prod
    for (let i = 0; i < items.length; i++) {
      if (items[i].product.id === product.id) {
        existingIndex = i;
        break;
      }
    }

    //If found: update quantity
    if(existingIndex >= 0) {
      const currentItem = items[existingIndex];
      let newQuantity = currentItem.quantity + quantity;

      if (newQuantity > product.stock) {
        newQuantity = product.stock;
      }

      items[existingIndex] = {
        product: currentItem.product,
        quantity: newQuantity
      };
    } else { //If not found : add new item
      const newItem: CartModel = {
        product: product,
        quantity: quantity
      };

      items.push(newItem);
    }

    //Save updated array back
    this.cartItems.set(items);
  }


  remove(productId: number) {
    const newItems: CartModel[] = [];

    for (const item of this.cartItems()) {
      if (item.product.id !== productId) {
        newItems.push(item);
      }
    }

    this.cartItems.set(newItems);
  }

  totalPrice(): number {
    let total = 0;

    for (const item of this.cartItems()) {
      total += item.product.price * item.quantity;
    }

    return total;
  }


  updateQuantity(productId: number, quantity: number) {
    const items = [...this.cartItems()];

    for (let i = 0; i < items.length; i++) {
      if (items[i].product.id === productId) {

        items[i] = {
          product: items[i].product,
          quantity: quantity
        };

        break;
      }
    }

    this.cartItems.set(items);
  }

  // remove all items
  clear() {
    this.cartItems.set([]);
  }

}
