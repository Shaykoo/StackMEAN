import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../product/products.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {

  productInfo = {};
  subscription : Subscription;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    //this.getProduct();
  }

  // getProduct(){
  //   this.subscription = this.productService.InfoObs
  //   .subscribe(product => {
  //     this.productInfo = product;
  //   })
  // }

  ngOnDestroy(){
   // this.subscription.unsubscribe();
  }
}
