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
  id: any;

  //Array of products
  cartProducts: any = [];

  constructor(private productService: ProductsService,
              private MixProductService: MixProductService) { }

  ngOnInit() {
    this.getSelectedProducts();
  }

  getSelectedProducts(){
    this.subscription = this.MixProductService.getSelectedProducts()
    .subscribe((selectedProducts : any) => {
      this.cartProducts.push(...selectedProducts.products);
      console.log("Cart Stuff", this.cartProducts);
    })
  }

  // getProduct(){
  //   this.subscription = this.productService.InfoObs
  //   .subscribe(product => {
  //     console.log("whitney", product)
  //     this.cartProducts.push(product);
  //   });
  // }

  // removeProduct(){
  //   this.productService.RemovedObs
  //   .subscribe(product => {
  //     let info: any = product;
  //     console.log("Removeding product", info.productID);
  //     let index = this.cartProducts.indexOf(info.productID);
  //     this.cartProducts.splice(index, 1);
  //   })
  // }

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
