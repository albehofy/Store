import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>()
  @Output() itemCountChange = new EventEmitter<number>()
  @Output() sortCountChange = new EventEmitter<string>()
  sort: string = "desc";
  itemsShowCount: number = 12;

  onsortUpdated(newSort: string): void {
    this.sortCountChange.emit(newSort)
    this.sort = newSort
  }
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count
    this.itemCountChange.emit(count)
  }
  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }
}
