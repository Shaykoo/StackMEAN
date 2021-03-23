import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectedProduct } from '../add-to-cart/selectedProduct.model';
import { Product } from '../product/product.model';
import { ProductsService } from '../product/products.service';
import { MixProductService } from '../services/mix-product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit , OnDestroy, AfterViewInit {

  constructor( private service: ProductsService,
               private mixProductService: MixProductService,
               public toastr: ToastrManager,
               private errorServive: ErrorService,
               private route: ActivatedRoute) {}

  images = [];
  size = new FormControl();
  subscription: Subscription;
  productInfo : any;
  selectedSize = '';
  removingProductId: string;
  state: any;

  addToCartBtn : boolean = false;
  addToCartBtnText : string = 'Add To Cart';

  sizeList: string[];

  ngOnInit(){ 
    console.log("One");
    this.getProduct();
  }

  ngAfterViewInit(){
    console.log("Two");
    // this.getProduct();
  }

    // this.images = [
    //   { path: "https://i.pinimg.com/474x/46/04/e8/4604e89d110d18978981278491446b40.jpg"},
    //   { path: "https://i.pinimg.com/474x/55/03/0c/55030cafbee7e3efa2e259c32fd59e61.jpg"},
    //   { path: "https://i.pinimg.com/474x/5a/de/23/5ade23622851862f238fb7e6d8cd0f85.jpg"},
    //   { path: "https://i.pinimg.com/474x/7d/b0/60/7db06038dc9b8fc61c4f3db74462d0a5.jpg"} 
    // ]
    
  getProduct(){
    this.subscription = this.route.paramMap.subscribe((id: any) => {
      console.log("id", id.params.id)
      let Id = id.params.id;
      this.mixProductService.getselectedProduct(Id)
      .subscribe((product: any)=> {
        console.log("new result", product)
        this.productInfo = product;
        this.images = this.productInfo.image.map((image: any)=>{
        return {path: image}
        });
        this.sizeList = product.sizes;
      })
    })
  }

  onAddRemoveCart(){
    const product = {
      ...this.productInfo,
      selectedSize: this.selectedSize,
    }
    if(!product.selectedSize){
      this.showWarning();
      return;
    }
    this.addToCartBtn = (this.addToCartBtn) ? false : true;
    this.addToCartBtnText = (this.addToCartBtn) ?  'Remove From Cart': 'Add To Cart';
    if(this.addToCartBtn){
     //localStorage.setItem('cartProducts', JSON.stringify(product));
      this.mixProductService.addingSelectedProduct(product)
      .subscribe((productData: any)=> {
        this.removingProductId = productData.product.selectedProd._id;
        this.service.addingProduct(product);
        this.showSuccess();
      });
    }else{
      this.mixProductService.removingSelectedProduct(this.removingProductId)
      .subscribe(deletedProduct => {
        console.log("One", deletedProduct)
        this.service.deletingProduct(deletedProduct)
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

  showWarning(){
    this.toastr.infoToastr('', 'Please select a size.');
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  // this.state.unsubscribe();
  }

}
