import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Product } from '../ViewModels/Product';
import { Observable } from 'rxjs';

const STORE_BASE_URL = "https://fakestoreapi.com"

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit {
  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort = 'desc', category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products${category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`)
  }
  ngOnInit(): void {

  }
  getAllCategory(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
  }
}
