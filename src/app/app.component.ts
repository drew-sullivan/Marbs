import { AuthService } from './services/auth.service';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Marbs';

  constructor(
    toastService: ToastService,
    toastManager: ToastsManager,
    vcr: ViewContainerRef,
    // private auth: AuthService
  ) {
    toastService.setUpVCR(vcr);
  }

  // UNCOMMENT TO TEST FASTER
  ngOnInit() {
    // this.auth.currentUser = {
    //   username: 'manager',
    //   password: 'password'
    // };
    // return;
  }
}
