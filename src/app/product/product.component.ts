import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product;
  products: Product[] = [];
  prodSubs: Subscription;

  constructor(private service: ProductsService, private route: Router) { }

  ngOnInit() {
    // this.product = 
    // {
    //    name: "Black slug", 
    //    description: "100% cotton, high quality product with embodiery.",
    //    price: 1000,
    //    image: '../../assets/productImages/tee0.jpeg' 
    // }
    this.getProducts();
  }

  getProducts(){
    console.log("tame")
    this.prodSubs = this.service.getProducts()
    .subscribe((data: any) => {
      this.products = data.products;
      console.log("data products", this.products)
    })
  }
  
  onProductSelect(product: Product){
    console.log("Product", product);
    this.service.changeProductInfo(product);
    localStorage.setItem('product', JSON.stringify(product));
    this.route.navigate([`/products/${product.id}`]);
  }

  ngOnDestroy(){
    this.prodSubs.unsubscribe();
  }

}
