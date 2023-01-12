import { LocalizedString } from '@angular/compiler';
import { Injectable , OnInit} from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { querystring } from '@firebase/util';
import { Member } from '../models/member';
import { FirebaseDataService } from './firebase-data.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth, private firebaseDataService: FirebaseDataService) { }
  member!: Member;
  members!: Member[];
  ngOnInit()
  {

  }

  async signin(email:string, password:string)
  {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    });
  }

  async signup(member: Member)
  {
    await this.firebaseAuth.createUserWithEmailAndPassword(member.email, member.password).then(res=>{
      if(res.user?.uid != undefined)
      {
        console.log(res.user.uid);
        this.firebaseDataService.addMember(member, member.email);
        window.alert("Kayıt Başarılı. Giriş Yapabilirsiniz.");
      }
    }); }

  logout()
  {
    this.firebaseAuth.signOut();
    localStorage.clear();
    this.isLoggedIn = false;
  }
}

