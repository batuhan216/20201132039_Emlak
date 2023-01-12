import { Component, OnInit} from '@angular/core';
import { Products } from 'src/app/models/products';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent
{
  constructor(
    public servis: FirebaseDataService,
  ) { }

  ngOnInit()
  {
    this.ListProducts();
  }
  products :Products[] = [];

  async ListProducts() {
    this.servis.getAllProducts().subscribe(res => {
      this.products = res.map((e: any) => {
        const data = e.payload.doc.data();
          console.log(data);
          return data;
        })

      //window.location.reload();
    }, err => {
      alert('Error while fetching Products');
    })
    }
  }
