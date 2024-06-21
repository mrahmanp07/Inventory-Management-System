import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.scss'
})
export class CreateProductsComponent implements OnInit{
  
  constructor(public http: HttpServiceService, private route: Router) { }
  ngOnInit(): void {
    
  }

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(),
    quantity: new FormControl(),
    description: new FormControl('')
  })

  onSubmit() {
    this.http.addData(this.productForm.value).subscribe((result: any) => {
      this.route.navigateByUrl('/productList')
    })

  }
}
