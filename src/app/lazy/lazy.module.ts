import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';


@NgModule({
  declarations: [ShoppingBagComponent],
  imports: [
    CommonModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
