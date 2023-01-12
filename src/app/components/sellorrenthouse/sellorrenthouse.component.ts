import { Products } from './../../models/products';
import { Component, DebugElement, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { Router } from '@angular/router';
import { HouseType } from 'src/app/models/houseType';
import { ProductType } from 'src/app/models/productType';
import { FileService } from 'src/app/services/file.service';
import { FileMetaData } from 'src/app/models/fileMetaData';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sellorrenthouse',
  templateUrl: './sellorrenthouse.component.html',
  styleUrls: ['./sellorrenthouse.component.scss']
})

export class SellorrenthouseComponent {
  constructor(
    public servis: FirebaseDataService,
    public router: Router,
    private fileService: FileService,
    private fireStorage: AngularFireStorage

  ) { }

  ngOnInit() {
    this.GoBack();
    this.getHouseTypes();
    this.getProductTypes();
  }

  product!: Products[];
  houseTypes: HouseType[] = [];
  productTypes: ProductType[] = [];
  selectedFiles !: FileList;
  currentFileUpload !: FileMetaData;
  percentage: number = 0;
  url: string = "";

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    imgurl: new FormControl(),
    productName: new FormControl(),
    description: new FormControl(null),
    price: new FormControl(null),
    houseTypeId: new FormControl(null),
    productTypeId: new FormControl(null),
    houseSize: new FormControl(null),
    howManyRoom: new FormControl(null),
    houseFloor: new FormControl(null),
    houseAge: new FormControl(null),
    adress: new FormControl(null),
    userId: new FormControl(null),
  });

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

  uploadFile() {
    this.currentFileUpload =  new FileMetaData(this.selectedFiles[0]);
    const path = 'Uploads/'+this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize( () => {
       storageRef.getDownloadURL().subscribe(downloadLink => {
         this.currentFileUpload.id = '';
         this.currentFileUpload.url = downloadLink;
         this.currentFileUpload.size = this.currentFileUpload.file.size;
         this.currentFileUpload.name = this.currentFileUpload.file.name;
         this.url = downloadLink;
         this.fileService.saveMetaDataOfFile(this.currentFileUpload);
       })
       this.ngOnInit();
    })
    ).subscribe( (res : any) => {
       this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
    }, err => {
       console.log('Error occured');
    });

 }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
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

  RegisterProduct()
  {
    this.form.patchValue({ imgurl: this.url });
    const userId = localStorage.getItem('email')!;
    const id = this.servis.angularFirestore.createId()!;
    this.form.patchValue({id: id})
    this.form.patchValue({ userId: userId });
    var product: Products = this.form.value;
    console.log(this.form.value);
    this.servis.addProduct(product);
    this.form.reset();
    this.router.navigate(["products"]);
  }

  GoBack()
  {
    if(localStorage.getItem("name") == null)
    {
      this.router.navigate(["login"]);
    }
  }
}
