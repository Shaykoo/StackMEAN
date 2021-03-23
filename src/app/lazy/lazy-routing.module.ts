import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';


const routes: Routes = [
  {path: '', component: ShoppingBagComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
