import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Cart, CartItem } from 'src/app/ViewModels/Cart';
@Component({
  selector: 'app-header',
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemQuantity = 0;
  @Input() get cart() {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart

    this.itemQuantity = cart.items
      .map(item => item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    console.log("From Headder")
    console.log(this.cart.items)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart()
  }
}
