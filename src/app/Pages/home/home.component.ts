import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/Services/cart.service';
import { StoreService } from 'src/app/Services/store.service';
import { Product } from 'src/app/ViewModels/Product';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  columnsNumber: number = 3;
  rowHeight = ROWS_HEIGHT[this.columnsNumber];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;
  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      })
  }

  onColumnChange(event: number): void {
    this.columnsNumber = event;
  }

  onItemChange(count: number): void {
    this.count = count.toString();
    this.getProducts()
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts()
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    }
  }

}
