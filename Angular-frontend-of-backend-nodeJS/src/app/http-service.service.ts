import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }

  private url = "http://localhost:3000/products";

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  addData(product: Product) {
    return this.httpClient.post(this.url, product);
  }

  getAll() {
    return this.httpClient.get(this.url);
  }

  deleteById(id: any) {
    return this.httpClient.delete(this.url + "/" + id);
  }

  getByID(id: any) {
    return this.httpClient.get(this.url + "/" + id);
  }

  updateData(product: Product) {
    return this.httpClient.put(this.url + "/" + product.id, product);
  }
}
