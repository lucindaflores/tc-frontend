import {Component, input, output, signal} from '@angular/core';

/* Stepper used in product-detail and cart */
@Component({
  imports: [],
  selector: 'app-stepper',
  styleUrl: './stepper.css',
  templateUrl: './stepper.html',
})
export class Stepper {
 //input() -> Parent sends data to child
  max = input.required<number>();
  quantity = signal(1);

  // output()  Child sends information to parent
  quantityChange = output<number>();

  initialQuantity = input(1);

  //read the current quantity onInit()
  ngOnInit() {
    this.quantity.set(this.initialQuantity());
  }

  decrease() {
    if (this.quantity() > 1) {
      this.quantity.update(value => value - 1);
      this.quantityChange.emit(this.quantity());
    }
  }

  increase() {
    if (this.quantity() < this.max()) {
      this.quantity.update(value => value + 1);
      this.quantityChange.emit(this.quantity());
    }
  }
}
