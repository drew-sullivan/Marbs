import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      
    });
  }

  onSubmit(loginForm: any) {
    const email = loginForm.form.controls['email'].value;
    const pw = loginForm.form.controls['password'].value;
    this.auth.login(email, pw);
  }

}
