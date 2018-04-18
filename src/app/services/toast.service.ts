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
    .then(() => $('.toast-info').css('background-color', '#60c4b0'));
  }

  showSuccess(message: string, title?: string) {
    this.toastsManager.success(message, title)
      .then(() => $('.toast-success').css('background-color', '#f27e21'));
  }

  showError(message: string, title?: string) {
    this.toastsManager.error(message, title)
      .then(() => $('.toast-error').css('background-color', '#92374d'));
  }

  showWarning(message: string, title?: string) {
    this.toastsManager.warning(message, title)
    .then(() => $('.toast-warning').css('background-color', '#FF7900'));
  }

}
