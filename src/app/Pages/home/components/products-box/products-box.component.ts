import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Product } from 'src/app/ViewModels/Product';

@Component({
  selector: 'app-products-box',
  templateUrl: 'products-box.component.html'
})
export class ProductsBoxComponent implements OnChanges {
  @Input() fullWidthMode = false;

  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter()
  constructor() {
  }
  ngOnChanges() {
  }
  onAddToCart() {
    this.addToCart.emit(this.product)
  }
}
