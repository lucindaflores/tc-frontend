import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user-service';
import { AddressService } from './address-service';

import { UserModel } from './user-model';
import { AddressModel } from './address-model';


@Component({
  selector: 'app-checkout',
  imports: [FormsModule ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  private userService = inject(UserService);
  private addressService = inject(AddressService);
  private router = inject(Router);
  private userId: any;

  user: UserModel = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: ''
  };

  address: AddressModel = {
    addressId: 0,
    street: '',
    houseNumber: '',
    bus: '',
    postalCode: '',
    city: '',
    country: '',
    userId: 0
  };

  ngOnInit() {
    const savedUser = sessionStorage.getItem('checkoutUser');
    const savedAddress = sessionStorage.getItem('checkoutAddress');
    sessionStorage.removeItem('orderId');

    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }

    if (savedAddress) {
      this.address = JSON.parse(savedAddress);
    }
  }


  async continueToPayment() {
    try {
      this.userId = await this.userService.create(this.user);
      this.user.userId = this.userId;


      this.address.addressId = await this.addressService.create(
        this.address, this.userId
      );

      this.address.userId = this.userId;

      // Remembers checkout information
      sessionStorage.setItem(
        'checkoutUser',
        JSON.stringify(this.user)
      );

      sessionStorage.setItem(
        'checkoutAddress',
        JSON.stringify(this.address)
      );

      // Go to payment
      await this.router.navigate(['/checkout/payment']);

    } catch (error) {
      console.error('Could not save delivery information', error);
    }
  }
}
