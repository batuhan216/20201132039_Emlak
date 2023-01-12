import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { ActivatedRoute, QueryParamsHandling, RouterModule } from '@angular/router';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})

export class AdminMembersComponent {
  constructor(
    public router: Router,
    public servis: FirebaseDataService,
    public route:ActivatedRoute,
  ) { }
  id!:string;
  members!:Member[];
  member!:Member;
  createdMember!:Member;
  ngOnInit()
  {
    this.GoBack();
    this.route.queryParams.subscribe(queryParam =>{
      this.id = queryParam['id'];
    });
    this.servis.getMemberByEmail(this.id).subscribe(a =>
      {
        this.member = a;
      });
  }

    DeleteMember()
    {
      this.servis.deleteMember(this.id);
      this.router.navigate(["admin"]);
    }

    ChangeMember(name:string, surname:string, adminParam:string, mobile:string, email:string)
    {
      var boolValue = (adminParam == "true")
      var changedMember:Member =
      {
        email: email,
        name: name,
        surname: surname,
        admin: boolValue,
        password: this.member.password,
        mobile: this.member.mobile
      };
      this.servis.addMemberWithSpecificId(changedMember, this.member.email)
    }
    MakeAdmin()
    {
      this.createdMember = this.member;
      if(this.createdMember.admin)
          this.createdMember.admin = false;
      else
      this.createdMember.admin = true;
      this.servis.updateMember(this.createdMember);
    }
    GoBack()
  {
    if(localStorage.getItem("admin") != "true")
    {
      this.router.navigate(["login"]);
    }
  }
}
