import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



const routes: Routes = [
  {path: 'product/:id', component: ProductComponent},
  {path: 'shoppingCart', component: ShoppingCartComponent},
  {path: 'shop/:id', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercemoduleRoutingModule { }
