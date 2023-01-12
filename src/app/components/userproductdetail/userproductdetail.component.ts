
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ActivatedRoute, QueryParamsHandling, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { ProductType } from 'src/app/models/productType';
import { HouseType } from 'src/app/models/houseType';

@Component({
  selector: 'app-userproductdetail',
  templateUrl: './userproductdetail.component.html',
  styleUrls: ['./userproductdetail.component.scss']
})

export class UserproductdetailComponent {
  product !: Products;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    public servis: FirebaseDataService,
    public router: Router
  ) { }

  ngOnInit(){
    this.getHouseTypes();
    this.getProductTypes();
    this.GoBack();
  this.route.queryParams.subscribe(queryParam =>{
    this.id = queryParam['id'];
    console.log(this.id);
  });

    this.servis.getProductObservableById(this.id).subscribe(a =>
      {
        this.product = a;
        this.imgurl = this.product.imgurl;
      });
 }

products!: Products[];
productTypes!: ProductType[];
houseTypes!: HouseType[];

_id!:string;

changedProduct!: Products;
product_id!: string;
imgurl!: string;
productName!: string;
description!: string;
price!: number;
houseType!: number;
houseSize!: number;
howManyRoom!: string;
houseFloor!: number;
houseAge!: number;
adress!: string;
userId!: number;

Change(productName:string, description:string, price:string, houseType:string, productType:string, houseSize:number, howManyRoom:number, houseFloor:number, houseAge:string, adress:string)
{
  const userId = localStorage.getItem('email')!;
  var changedProduct = new Products(
    this.id, this.imgurl, productName,
    description, Number(price), houseType, productType, houseSize, howManyRoom,
    houseFloor, Number(houseAge), adress, userId)

  console.log(changedProduct);
  this.servis.addProductWithSpecificId(changedProduct, this.id);
}


getHouseTypes()
  {
    this.servis.getHouseTypes().subscribe(res => {
      this.houseTypes = res.map((e: any) => {
        const data = e.payload.doc.data();
          console.log(data);
          return data;
        })

      //window.location.reload();
    }, err => {
      alert('Error while fetching houseTypes');
    })
  }

  getProductTypes()
  {
    this.servis.getProductTypes().subscribe(res => {
      this.productTypes = res.map((e: any) => {
        const data = e.payload.doc.data();
          console.log(data);
          return data;
        })

      //window.location.reload();
    }, err => {
      alert('Error while fetching houseTypes');
    })
  }
  Delete()
  {
    this.servis.deleteProduct(this.id);
    this.router.navigate(["userproducts"]);
  }

  GoBack()
  {
    if(localStorage.getItem("name") == null)
    {
      this.router.navigate(["login"]);
    }
  }
}

