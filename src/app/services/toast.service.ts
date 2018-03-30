import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastService {
  constructor(private toastsManager: ToastsManager) { }

  setUpVCR(vcr: ViewContainerRef) {
    this.toastsManager.setRootViewContainerRef(vcr);
  }

  showInfo() {
    this.toastsManager.success('Title', 'Message toast');
  }
}
