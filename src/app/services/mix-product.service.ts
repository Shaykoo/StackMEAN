import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http";
import { selectedProduct } from "../add-to-cart/selectedProduct.model";
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL+ 'products/';

@Injectable({
  providedIn: 'root'
})
export class MixProductService {

  constructor(private http: HttpClient) { }

  addingSelectedProduct(selectedProduct: any){
      return this.http.post<selectedProduct>(BACKEND_URL + selectedProduct.id, selectedProduct);    
  }

  removingSelectedProduct(selectedProduct: any){
    return this.http.delete<selectedProduct>(BACKEND_URL + selectedProduct)
  }

  getselectedProduct(id: any){
    console.log("sending ID", BACKEND_URL + id)
    return this.http.get<selectedProduct>(BACKEND_URL + id)
  }

  getSelectedProducts(){
    return this.http.get<selectedProduct>(BACKEND_URL + 'cart')
  }

}
