import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProductComponent } from "./product/product.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { AddToCartComponent } from "./add-to-cart/add-to-cart.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [
  { path: "", redirectTo: "products", pathMatch: 'full'},
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "products", component: ProductComponent },
  { path: "products/:id", component: ProductPageComponent},
  { path: "wishlist", component: WishlistComponent},
  { path: "cart", component: AddToCartComponent},
  { path: "checkout", component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
