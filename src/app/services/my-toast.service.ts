import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Messages} from '../models/Messages';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MytoastService {

  constructor(
    private toast: HotToastService

  ) { }
  ToastUygula(message: Messages) {

    if (message.process) {
      this.toast.success(message.message, {
        style: {
          border: '1px solid #0e7309',
          padding: '16px',
          color: '#0e7309',
        }
      });
    } else {
      this.toast.error(message.message, {
        style: {
          border: '1px solid #a30505',
          padding: '16px',
          color: '#a30505',
        }
      });
    }
  }
}
