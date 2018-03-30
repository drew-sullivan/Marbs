import { Component, ViewContainerRef } from '@angular/core';
import { ToastService } from './services/toast.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Marbs';

  constructor(toastService: ToastService, toastManager: ToastsManager, vcr: ViewContainerRef) {
    toastService.setUpVCR(vcr);
  }
}
