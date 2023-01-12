import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ActivatedRoute, QueryParamsHandling, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { HouseType } from 'src/app/models/houseType';
import { ProductType } from 'src/app/models/productType';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  product !: Products;
  id: string = "";
  constructor(
    private route: ActivatedRoute,
    public servis: FirebaseDataService,
    public router: Router
  ) { }

  ngOnInit(){
    this.GoBack();
    this.getHouseTypes();
    this.getProductTypes();
  this.route.queryParams.subscribe(queryParam =>{
    this.id = queryParam['id'];
  });
  this.servis.GetProductById(this.id).subscribe(a =>
    {
      this.product = a;
    });
 }

imgurl: string = "0.jpg";
_id!:Number;
houseTypes: HouseType[] = [];
productTypes: ProductType[] = [];

Change(productName:string, description:string, price:string, houseType:string, productType:string, houseSize:string, howManyRoom:number, houseFloor:string, houseAge:string, adress:string)
{
  var changedProduct:Products =
  {
    id: this.id,
    imgurl: this.product.imgurl,
    productName: productName,
    description: description,
    price: Number(price),
    houseTypeId: houseType,
    productTypeId: productType,
    houseSize: Number(houseSize),
    howManyRoom: Number(howManyRoom),
    houseFloor: Number(houseFloor),
    houseAge: Number(houseAge),
    adress: adress,
    userId: this.product.userId
  };

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
    if(localStorage.getItem("admin") != "true")
    {
      this.router.navigate(["login"]);
    }
  }
}
