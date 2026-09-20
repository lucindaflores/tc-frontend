import { Component, inject, ChangeDetectorRef  } from '@angular/core';
import {ProductCondensed} from './product-model';
import {ProductService} from './product-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [
  ],
  selector: 'app-product',
  styleUrl: './product.css',
  templateUrl: './product.html',
})
export class Product {

  products: ProductCondensed[] = [];
  loading = true;
  errorMessage = '';

  // the selected button
  selectedCategory = 0;

  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  private changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.route.queryParams.subscribe((params) => {

      console.log("START");
      const categoryId = Number(params['category']);

      if (categoryId === 1 || categoryId === 2 || categoryId === 3) {
        void this.loadByCategory(categoryId);
      } else {
        void this.loadByCategory(0);
        console.log("cat 0");
      }

    });
  }

  async loadByCategory(categoryId: number) {
    try {
      this.products = [];

      this.selectedCategory = categoryId;
      this.loading = true;
      this.errorMessage = '';

      if (categoryId === 0) { // Load all
        this.products = await this.productService.findAll();
      } else {
        this.products = await this.productService.findByCategory(categoryId);
        console.log("Button clicked: " + categoryId);
      }

    } catch (error) {
      this.errorMessage = 'The products could not be loaded.';
    } finally {
      this.loading = false;
    }

    this.changeDetectorRef.detectChanges();
  }


}
