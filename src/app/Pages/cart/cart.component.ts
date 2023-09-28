import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Cart, CartItem } from 'src/app/ViewModels/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent {
  cart: Cart = {
    items: [{
      product: "https://via.placeholder.com/150",
      name: "Snikers",
      price: 150,
      quantity: 1,
      id: 1
    }, {
      product: "https://via.placeholder.com/150",
      name: "Snikers",
      price: 450,
      quantity: 3,
      id: 2
    }]
  }
  dataSource: Array<CartItem> = []
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  constructor(private cartService: CartService,) {
  }
  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items
    })

  }

  getTotal(item: Array<CartItem>): number {
    return this.cartService.getTotal(item)
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.RemoveFromCart(item)
  }

  OnAddQuantity(item: CartItem) {
    this.cartService.addToCart(item)
  }
  onRemoveQuantity(item: CartItem) {
    this.cartService.RemoveQuantity(item)
  }
  onCheckout(): void {
    this.cartService.checkout()
  }
}
