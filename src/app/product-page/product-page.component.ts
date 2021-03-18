import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectedProduct } from '../add-to-cart/selectedProduct.model';
import { Product } from '../product/product.model';
import { ProductsService } from '../product/products.service';
import { MixProductService } from '../services/mix-product.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit , OnDestroy {

  constructor( private service: ProductsService,
               private mixProductService: MixProductService,
               public toastr: ToastrManager) {}

  images = [];
  size = new FormControl();
  subscription: Subscription;
  productInfo : any;
  selectedSize = '';
  removingProductId: string;

  addToCartBtn : boolean = false;
  addToCartBtnText : string = 'Add To Cart';

  sizeList: string[];

  ngOnInit() { 
    if(!localStorage.getItem('product')){
      this.productSubscribing();
      localStorage.setItem('product', this.productInfo);
    }else{
      this.productInfo = JSON.parse(localStorage.getItem('product')) ;
      this.images = this.productInfo.image.map((image)=>{
        return {path: image}
      });
      this.sizeList = this.productInfo.sizes;
      console.log("already have", this.productInfo)
    }
    // this.images = [
    //   { path: "https://i.pinimg.com/474x/46/04/e8/4604e89d110d18978981278491446b40.jpg"},
    //   { path: "https://i.pinimg.com/474x/55/03/0c/55030cafbee7e3efa2e259c32fd59e61.jpg"},
    //   { path: "https://i.pinimg.com/474x/5a/de/23/5ade23622851862f238fb7e6d8cd0f85.jpg"},
    //   { path: "https://i.pinimg.com/474x/7d/b0/60/7db06038dc9b8fc61c4f3db74462d0a5.jpg"} 
    // ]
    
  }

  productSubscribing(){
    this.subscription = this.service.productInfoObs
    .subscribe((product: any) => {
      console.log("RealTime",product);
      this.productInfo = product;
      this.images = product.image;
      this.sizeList = product.sizes;
      console.log("new added", this.productInfo, this.images)
    });
  }

  onAddCart(){
    const product = {
      ...this.productInfo,
      selectedSize: this.selectedSize,
    }
    this.addToCartBtn = (this.addToCartBtn) ? false : true;
    this.addToCartBtnText = (this.addToCartBtn) ?  'Remove From Cart': 'Add To Cart';
    if(this.addToCartBtn){
      this.service.addingProduct(product);
      localStorage.setItem('cartProducts', JSON.stringify(product));
      this.mixProductService.addingSelectedProduct(product)
      .subscribe((productData: any)=> {
        this.removingProductId = productData.product.selectedProd._id;
        this.showSuccess();
      });
    }else{
      this.mixProductService.removingSelectedProduct(this.removingProductId)
      .subscribe(deletedProduct => {
        console.log("deleted product", deletedProduct);
        this.showInfo();
      })
    }
  }


  // Toastr Methods   
  showSuccess() {
    this.toastr.successToastr('', 'Product is moved to the cart.');
  }

  showInfo() {
    this.toastr.infoToastr('', 'Product removed from the cart.');
  }

  ngOnDestroy(){
   // this.subscription.unsubscribe();
  }

}
