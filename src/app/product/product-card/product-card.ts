import { Component, input } from '@angular/core';
import { ProductCondensed } from '../product-model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<ProductCondensed>();

}
