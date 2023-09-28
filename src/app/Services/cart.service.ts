import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../ViewModels/Cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })
  constructor(private _snackBar: MatSnackBar) {

  }
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]
    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item)
    }

    this.cart.next({ items });
    this._snackBar.open("one item added to cart", "ok", { duration: 3000 });
  }

  getTotal(item: Array<CartItem>): number {
    return (item.map((item) => item.price * item.quantity).reduce((previous, current) => (previous + current), 0))
  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackBar.open("cart is clear", "ok", { duration: 3000 })
  }

  RemoveFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter((_item) => _item.id !== item.id)
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("1 item removed from cart", "ok", { duration: 3000 })
    }
    return filteredItems
  }

  RemoveQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map(_item => {
      if (_item.id = item.id) {
        _item.quantity--;
        if (item.quantity === 0) {
          itemForRemoval = _item
        }
      }
      return _item
    })
    if (itemForRemoval) {
      filteredItems = this.RemoveFromCart(itemForRemoval, false)
    }
    this.cart.next({ items: filteredItems })
    this._snackBar.open("one item removed from the cart", "ok", { duration: 3000 })
  }
  checkout(): void {
    this.clearCart();
    this._snackBar.open("1 payment method completed in right way", "ok", { duration: 3000 })
  }

}
