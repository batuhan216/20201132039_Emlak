import { AdminMembersComponent } from './components/admin-members/admin-members.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SellorrenthouseComponent } from './components/sellorrenthouse/sellorrenthouse.component';
import { UserproductdetailComponent } from './components/userproductdetail/userproductdetail.component';
import { UserproductsComponent } from './components/userproducts/userproducts.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"products", component: ProductsComponent},
  {path:"admin", component: AdminComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"userproducts", component:UserproductsComponent},
  {path:"userproductdetail", component:UserproductdetailComponent},
  {path: "product-detail", component: ProductDetailComponent},
  {path: "sellorrenthouse", component:SellorrenthouseComponent},
  {path:"admin-products", component:AdminProductsComponent},
  {path:"admin-members", component:AdminMembersComponent},
  {path:"logout", component: LogoutComponent},
  {path:"**", component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
