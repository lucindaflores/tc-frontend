import { Service } from '@angular/core';
import { ProductCondensed, ProductModel } from './product-model';


@Service()
export class ProductService {

  private readonly url = 'https://talaveracobalto.onrender.com/products';

  // Find ALL Products
  async findAll(): Promise<ProductCondensed[]> {
    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error('REQUEST_ERROR');
    }

    return await response.json();
  }

  // Find by category:
  //GET http://localhost:8080/products/bycategory/1
  // 0 - All
  // 1 - Cookware
  // 2 - Tableware
  // 3 - Decor
  async findByCategory(category: number): Promise<ProductCondensed[]> {
    const response = await fetch(`${this.url}?categoryId=${category}`, {});

    if (!response.ok) {
      throw new Error('REQUEST_ERROR');
    }
    return await response.json();
  }

  /* Find a product by id */
  // GET http://localhost:8080/products/{{id}}
  async findById(id: number): Promise<ProductModel> {
    const response = await fetch(`${this.url}/${id}`);

    if (response.status === 404) {
      throw new Error('NOT_FOUND');
    }

    if (!response.ok) {
      throw new Error('REQUEST_ERROR');
    }

    return await response.json();
  }

}
