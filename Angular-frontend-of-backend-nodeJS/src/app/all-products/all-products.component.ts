import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {
  constructor(public http: HttpServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }
  productList: any[] = []

  getAll() {
    this.http.getAll().subscribe((result: any) => {
      this.productList = result;
    })
  }

  delete(id: any) {
    this.http.deleteById(id).subscribe((result: any) => {
      this.getAll();
    })

  }
}
