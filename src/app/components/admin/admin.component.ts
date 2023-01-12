import { Component, OnInit} from '@angular/core';
import { Products } from 'src/app/models/products';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    public router: Router,
    public servis: FirebaseDataService,
  ) { }

  ngOnInit()
  {
    this.ListProducts();
    this.ListMembers();
  }
  products!:Products[];
  members!:Member[];

  async ListProducts()
  {
  this.servis.getAllProducts().subscribe(res => {

    this.products = res.map((e: any) => {
      const data = e.payload.doc.data();
      console.log(data);
      return data;
    })
    //window.location.reload();
  }, err => {
    alert('Error while fetching student data');
  })
  }

  async ListMembers()
  {
  this.servis.getAllMembers().subscribe(res => {

    this.members = res.map((e: any) => {
      const data = e.payload.doc.data();
      console.log(data);
      return data;
    })
    //window.location.reload();
  }, err => {
    alert('Error while fetching student data');
  })
  }
  Delete(id:string)
  {
      this.servis.deleteProduct(id);
  }

  DeleteMember(email:string)
  {
      this.servis.deleteMember(email);
  }

}
