import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product-service';
import { ProductModel } from '../product/product-model';
import { Stepper } from './stepper/stepper';
import { CartService } from '../cart/cart-service';


@Component({
  imports: [
    Stepper
  ],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  // Cart
  private readonly cartService = inject(CartService);

  // Signal to keep track of the UI state changes
  product = signal<ProductModel | undefined>(undefined);
  loading = signal(true);
  errorMessage = signal('');
  selectedQuantity = signal(1);

  addedToCart = signal(false);

  constructor() {
    void this.loadProduct();
  }

  async loadProduct() {
    // the activated route
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      // sets it's a signal
      this.product.set(await this.productService.findById(id));
    } catch (error) {
      this.errorMessage.set('The product could not be loaded.');
    } finally {
      this.loading.set(false);
    }

  }

  /* Updates the quantity in the stepper */
  updateQuantity(quantity: number) {
    this.selectedQuantity.set(quantity);
  }

  /* Method to add a product to the cart */
  addToCart() {
    const currentProduct = this.product();

    if (!currentProduct) {
      return;
    }

    this.cartService.add(currentProduct, this.selectedQuantity());

    // Flag that changes the button to "Added to cart" 2sec
    this.addedToCart.set(true);
    setTimeout(() => {
      this.addedToCart.set(false);
    }, 2000)

  }

  /* the current quantity of a product in the cart for each product,
     when a consequent products are added they are added to the quantity
      in cart */
  quantityInCart(): number {
    const currentProduct = this.product();

    if (!currentProduct) {
      return 0;
    }

    const items = this.cartService.items();

    for (const item of items) {

      if (item.product.id === currentProduct.id) {
        return item.quantity;
      }
    }

    return 0;
  }
}
