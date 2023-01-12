import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    public router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit()
  {
    this.firebaseService.logout();
    this.router.navigate([""]);
  }
}
