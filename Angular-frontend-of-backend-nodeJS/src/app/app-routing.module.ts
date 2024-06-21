import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [
  {path: "edit/:id", component: EditProductComponent},
  {path: "addProduct", component: CreateProductsComponent},
  {path: "productList", component: AllProductsComponent},
  {path:'**', component: CreateProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
