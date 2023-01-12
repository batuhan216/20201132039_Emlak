import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ActivatedRoute, QueryParamsHandling } from '@angular/router';
import { Member } from 'src/app/models/member';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit{
  product !: Products;
  member !: Member;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    public servis: FirebaseDataService
  ) { }

  ngOnInit(){
  this.route.queryParams.subscribe(queryParam =>{
    this.id = queryParam['id'];
  });
  this.servis.GetProductById(this.id).subscribe(a =>
    {
      this.product = a;
    });
    console.log(this.member);
 }

 whichPerson()
 {
  this.servis.getMemberByEmail(this.product.userId).subscribe(b => { this.member = b;})
  console.log(this.member);
 }
}
