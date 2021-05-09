import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/store/book/book.component';
import { CartComponent } from './components/store/cart/cart.component';
import { PurchasesComponent } from './components/store/purchases/purchases.component';
import { StoreComponent } from './components/store/store.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "store", component: StoreComponent},
  {path: "cart", component: CartComponent, canActivate: [AuthGuard]},
  {path: "purchases", component: PurchasesComponent, canActivate: [AuthGuard]},
  {path: "about", component: AboutComponent},
  {path: "book/:id", component: BookComponent},
  {path:"**", pathMatch: "full", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
