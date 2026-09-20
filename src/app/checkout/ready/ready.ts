import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-ready',
  styleUrl: './ready.css',
  templateUrl: './ready.html',
})
export class Ready {

  orderId = sessionStorage.getItem('orderId');
}
