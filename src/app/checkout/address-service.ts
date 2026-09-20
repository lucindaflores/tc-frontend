import { Service } from '@angular/core';
import { AddressModel } from './address-model';

@Service()
export class AddressService {

  private url = 'https://talavera-cobalto.onrender.com/addresses';

  async create(address: AddressModel, userId: number): Promise<number> {
    const response = await fetch(`${this.url}?userId=${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
      }
    );

    if (!response.ok) {
      throw new Error('Could not create address');
    }

    return await response.json();
  }

}
