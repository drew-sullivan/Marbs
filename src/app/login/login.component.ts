import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, EmailValidator } from '@angular/forms';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit() {
  }

  onSubmit(loginForm: any) {
    const email = loginForm.email;
    const password = loginForm.password;
    this.auth.login(email, password);
  }

}
