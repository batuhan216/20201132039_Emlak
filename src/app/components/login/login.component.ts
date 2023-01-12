import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Member } from 'src/app/models/member';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(
    public router: Router,
    public firebaseService: FirebaseService,
    public firebaseDataService: FirebaseDataService
  ) { }
  async ngOnInit()
  {
    this.GoBack();
  }

  member: Member = new Member();
  members: Member[] = [];

async LogIn(mail: string, password: string)
{
  await this.firebaseService.signin(mail, password);
  await this.getMember(mail);

}
 async getMember(mail: string)
{
  if(this.firebaseService.isLoggedIn)
  {
    await this.firebaseDataService.getMemberByEmail(mail).subscribe(e => {
     this.member = e;
     localStorage.setItem("admin", "" + this.member.admin);
     localStorage.setItem("name", this.member.name);
     localStorage.setItem("email", this.member.email);
     console.log(e);
     window.location.reload();
  });}
}
async getMember1(mail: string)
{
  this.firebaseDataService.getAllMembers().subscribe(res => {

    this.members = res.map((e: any) => {
      const data = e.payload.doc.data();
      if(data.email == mail)
      {
        this.member = data;
        localStorage.setItem("admin", data.admin);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        console.log(data);
        return;
      }
      return data;
    })
    //window.location.reload();
  }, err => {
    alert('Error while fetching student data');
  })
}
  GoBack()
  {
    if(localStorage.getItem("name") != null)
    {
      this.router.navigate([""]);
    }
  }
}
