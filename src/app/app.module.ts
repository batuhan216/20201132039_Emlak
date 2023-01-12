import { LoginComponent } from './components/login/login.component';
import { MytoastService } from './services/my-toast.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserproductsComponent } from './components/userproducts/userproducts.component';
import { UserproductdetailComponent } from './components/userproductdetail/userproductdetail.component';
import { SellorrenthouseComponent } from './components/sellorrenthouse/sellorrenthouse.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminMembersComponent } from './components/admin-members/admin-members.component';
import { initializeApp } from "firebase/app";
import {AngularFireModule} from '@angular/fire/compat';
import { FirebaseService } from './services/firebase.service';
import { LogoutComponent } from './components/logout/logout.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    AdminComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    UserproductsComponent,
    UserproductdetailComponent,
    SellorrenthouseComponent,
    AdminProductsComponent,
    AdminMembersComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HotToastModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [MytoastService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
