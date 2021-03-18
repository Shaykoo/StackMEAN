import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../product/products.service';
import { MixProductService } from '../services/mix-product.service';
import { selectedProduct } from './selectedProduct.model';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  productInfo: any;
  featuredImage: any;
  subscription : Subscription;
  id:any;

  //Array of products
  cartProducts: any = [];

  constructor(private productService: ProductsService,
              private MixProductService: MixProductService) { }

  ngOnInit() {
    if(!localStorage.getItem('cartProducts')){
      this.getProduct();
      console.log("One");
    }else{
      this.productInfo = JSON.parse(localStorage.getItem('cartProducts')) ;
      this.featuredImage = this.productInfo.featuredImage;
      this.id = this.productInfo.id;
     // this.selectedProductSub()
      this.cartProducts.push(this.productInfo);
      console.log("Two", this.cartProducts);
    }
  }

  getProduct(){
    this.subscription = this.productService.InfoObs
    .subscribe(product => {
      this.productInfo = product;
      this.featuredImage = this.productInfo.featuredImage;
      this.cartProducts.push(this.productInfo);
    });
  }

  // selectedProductSub(){
  //   this.MixProductService.addingSelectedProduct(this.productInfo)
  //     .subscribe(product => {
  //       console.log('saved selected product', product);
  //     })
  // }

  ngOnDestroy(){
   //this.subscription.unsubscribe();
  }

}
