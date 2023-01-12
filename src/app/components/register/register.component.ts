import { Member } from './../../models/member';
import { Component, DebugElement, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent
{

  constructor(
    public router: Router,
    public httpClient:HttpClient,
    public firebaseService: FirebaseService,
    public firebaseDataService: FirebaseDataService,
  ) { }

  ngOnInit()
  {
    this.GoBack();
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    admin: new FormControl(),
    password: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
  });

  Register()
  {
    this.form.patchValue({admin: false})
    var member: Member = this.form.value;
    this.firebaseService.signup(member);
  }

  GoBack()
  {
    if(localStorage.getItem("name") != null)
    {
      this.router.navigate([""]);
    }
  }
}


