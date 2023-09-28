import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styles: [
  ]
})
export class FiltersComponent implements OnDestroy {
  @Output() showCategory = new EventEmitter<string>()
  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;
  constructor(private storeServices: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeServices.getAllCategory().subscribe(res => {
      this.categories = res
    })
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription)
      this.categoriesSubscription
  }

}
