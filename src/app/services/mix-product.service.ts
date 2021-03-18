import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http";
import { selectedProduct } from "../add-to-cart/selectedProduct.model";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MixProductService {

  constructor(private http: HttpClient) { }

  addingSelectedProduct(selectedProduct: any){
      console.log("Selected", selectedProduct);
      return this.http.post<selectedProduct>(`http://localhost:3000/api/products/${selectedProduct.id}`, selectedProduct);    
  }

  removingSelectedProduct(selectedProduct: any){
    console.log("deleting", selectedProduct)
    return this.http.delete<selectedProduct>(`http://localhost:3000/api/products/${selectedProduct}`)
  }
  
}
