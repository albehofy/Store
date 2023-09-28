import { Component, OnInit } from '@angular/core';
import { Cart } from './ViewModels/Cart';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styles: []
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] }
  constructor(private cartService: CartService) {

  }
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart
    })

  }
}
