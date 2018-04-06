import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as $ from 'jquery';

@Injectable()
export class ToastService {
  constructor(private toastsManager: ToastsManager) {}

  setUpVCR(vcr: ViewContainerRef) {
    this.toastsManager.setRootViewContainerRef(vcr);
  }

  showInfo(message: string, title?: string) {
    this.toastsManager.info(message, title)
    .then(() => $('.toast-info').css('background-color', '#00C7E9'));
  }

  showSuccess(message: string, title?: string) {
    this.toastsManager.success(message, title)
      .then(() => $('.toast-success').css('background-color', '#6FC04A'));
  }

  showError(message: string, title?: string) {
    this.toastsManager.error(message, title)
      .then(() => $('.toast-error').css('background-color', '#A94467'));
  }

  showWarning(message: string, title?: string) {
    this.toastsManager.warning(message, title)
    .then(() => $('.toast-warning').css('background-color', '#FF7900'));
  }

}
