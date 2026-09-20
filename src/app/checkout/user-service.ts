import { Service } from '@angular/core';
import { UserModel } from './user-model';

@Service()
export class UserService {

  private url = 'https://talavera-cobalto.onrender.com/users';


  async create(user: UserModel): Promise<UserModel> {

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error('Could not create user');
    }

    return await response.json();
  }

}
