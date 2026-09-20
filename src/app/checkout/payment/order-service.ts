import { Service } from '@angular/core';

@Service()
export class OrderService {

  private url = 'http://localhost:8080/orders';

  async create(order: any): Promise<number> {

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error('Could not create order');
    }

    return await response.json();
  }
}
