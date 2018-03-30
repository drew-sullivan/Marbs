import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastService {
  constructor(private toastsManager: ToastsManager) {}

  setUpVCR(vcr: ViewContainerRef) {
    this.toastsManager.setRootViewContainerRef(vcr);
  }

  showInfo(message: string, title?: string) {
    this.toastsManager.info(message, title);
  }
}
