import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QueryDocumentSnapshot, QuerySnapshot, DocumentReference} from '@angular/fire/compat/firestore';
import { Member } from '../models/member';
import { map, Observable } from 'rxjs';
import { Products } from '../models/products';
import { ProductType } from '../models/productType';
import { HouseType } from '../models/houseType';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor(public angularFirestore: AngularFirestore) { }

  addMember(member: Member, email:string)
  {
    return new Promise<any>((resolve, reject) => {
      return this.angularFirestore.collection('/Users').doc(email).set(member).then(response => {console.log(response)}, error => reject(error));
    })
  }

  addMemberWithSpecificId(member: Member, email: string)
  {
    return this.angularFirestore.collection('Users').doc(email).set(member);
  }

  getAllMembers()
  {
    return this.angularFirestore.collection('Users').snapshotChanges();
  }

  getMemberByEmail(email: string)
  {
    return this.angularFirestore.collection('Users').doc(email).get().pipe(map(docSnapshot =>{
      const data = JSON.parse(JSON.stringify(docSnapshot.data()));
      return data as Member;
    }));
  }

  deleteMember(email: string)
  {
    return this.angularFirestore.collection('Users').doc(email).delete();
  }


  updateMember(member: Member)
  {
    this.deleteMember(member.email);
    this.addMember(member, member.email);
  }



  getAllProducts()
  {
    return this.angularFirestore.collection('Products').snapshotChanges();
  }

  addProduct(product: Products)
  {
    return new Promise<any>((resolve, reject) => {
      var prod:Products =
    {
      id: product.id,
      imgurl: product.imgurl,
      productName: product.productName,
      description: product.description,
      price: Number(product.price),
      houseTypeId: product.houseTypeId,
      productTypeId: product.productTypeId,
      houseSize: Number(product.houseSize),
      howManyRoom: product.howManyRoom,
      houseFloor: Number(product.houseFloor),
      houseAge: Number(product.houseAge),
      adress: product.adress,
      userId: product.userId
    };
      return this.angularFirestore.collection('Products').doc(product.id).set(prod).then(response => {console.log(response)}, error => reject(error));
    })
  }
  addProductWithSpecificId(product: Products, id: string)
  {
    return new Promise<any>((resolve, reject) => {
    var prod:Products =
    {
      id: product.id,
      imgurl: product.imgurl,
      productName: product.productName,
      description: product.description,
      price: Number(product.price),
      houseTypeId: product.houseTypeId,
      productTypeId: product.productTypeId,
      houseSize: Number(product.houseSize),
      howManyRoom: product.howManyRoom,
      houseFloor: Number(product.houseFloor),
      houseAge: Number(product.houseAge),
      adress: product.adress,
      userId: product.userId
    };
      return this.angularFirestore.collection('Products').doc(id).set(prod).then(response => {console.log(response)}, error => reject(error));

    })
  }
  getAllProductsByEmail(email: string)
  {
    const collection = this.angularFirestore.collection('Products', ref => ref.where('userId', '==', email));
    const products = collection.valueChanges()
      return products as Observable<Products[]>;
  }

  GetProductById(id: string)
  {
    return this.angularFirestore.collection('Products').doc(id).get().pipe(map(docSnapshot =>{
      const data = JSON.parse(JSON.stringify(docSnapshot.data()));
      return data as Products;
    }));
  }

  getProductObservableById(id: string)
  {
    const collection = this.angularFirestore.collection('Products', ref => ref.where('id', '==', id));
      const products = collection.valueChanges().pipe(map(products =>
        {
          const product = products[0];
          return product;
        }))
        return products as Observable<Products>;
  }

  deleteProduct(id:string)
  {
    return this.angularFirestore.collection('Products').doc(id).delete();
  }

  getHouseTypes()
  {
    return this.angularFirestore.collection('HouseType').snapshotChanges();
  }

  getSpecificHouseType(id: number)
  {
    return this.angularFirestore.collection('HouseType').doc(""+id).get().pipe(map(docSnapshot =>{
      const data = JSON.parse(JSON.stringify(docSnapshot.data()));
      return data as HouseType;
    }));
  }

  getProductTypes()
  {
    return this.angularFirestore.collection('ProductType').snapshotChanges();
  }

  getSpecificProductType(id:number)
  {
    return this.angularFirestore.collection('ProductType').doc(""+id).get().pipe(map(docSnapshot =>{
      const data = JSON.parse(JSON.stringify(docSnapshot.data()));
      return data as ProductType;
    }));
  }
}
