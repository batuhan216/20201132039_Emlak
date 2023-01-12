import { Component, OnInit} from '@angular/core';
import { Products } from 'src/app/models/products';
import { Router } from '@angular/router';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.scss']
})
export class UserproductsComponent {
    constructor(
      public servis: FirebaseDataService,
      public router: Router,
    ) { }
    Id!:string;
    async ngOnInit()
    {
      this.GoBack();
      this.ListProducts();
      this.Id = localStorage.getItem("email")!;
    }
    products!: Products[];
    product!: Products;
    productObs!: Observable<Products>;

      ListProducts()
      {
        this.servis.getAllProductsByEmail(localStorage.getItem("email")!).subscribe(e =>
          {
            this.products = e;
          })
      }

    readLocalStorageValue(): string {
      const id: string = localStorage.getItem("id")!
      return id;
  }

  GoBack()
  {
    if(localStorage.getItem("name") == null)
    {
      this.router.navigate(["login"]);
    }
  }
}
