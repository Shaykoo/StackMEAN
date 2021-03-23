import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Product } from '../product/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //Initilizing behaviour subject for Product Info
  private productInfo = new BehaviorSubject({});
  productInfoObs = this.productInfo.asObservable();

  private product = new BehaviorSubject({});
  InfoObs = this.product.asObservable();

  private productRemoval = new BehaviorSubject({});
  RemovedObs = this.productRemoval.asObservable();


  constructor(private http: HttpClient) { }

  // Getting All the Products
  getProducts(){
    return this.http.get<Product>('http://localhost:3000/api/products')
  }

  //Sending product info to products page
 
  changeProductInfo(product: Product) {
    this.productInfo.next(product)
  }

  addingProduct(message: any) {
    this.product.next(message);
  }

  deletingProduct(message: any){
    this.productRemoval.next(message);
  }


}