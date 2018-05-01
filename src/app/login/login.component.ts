import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  width: number;
  height: number;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit() {
    console.log(this.width);
    console.log(this.height);
  }

  onSubmit(loginForm: any) {
    const username = loginForm.username;
    const password = loginForm.password;
    this.auth.login(username, password);
  }

}
