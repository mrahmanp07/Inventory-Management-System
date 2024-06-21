import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(public http: HttpServiceService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getByID(this.id);
  }

  id!: any;
  productList!: Product;

  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    price: new FormControl(),
    quantity: new FormControl(),
    description: new FormControl('')
  });

  getByID(id: any) {
    this.http.getByID(id).subscribe((result: any) => {
      this.productList = result;
      console.log(this.productList.id);
      
      console.log(this.productList);
      this.productForm.setValue(result);
    });
  }

  onSubmit() {
    this.http.updateData(this.productForm.value).subscribe((result: any) => {
      console.log('Updated product:', result);
      this.router.navigateByUrl('/productList');
    });
  }
    
  }



