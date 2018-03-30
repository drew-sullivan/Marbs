import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor(private toastService: ToastService) {}

  add(message: string) {
    this.toastService.showInfo();
   // this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
