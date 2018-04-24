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

    this.email.valueChanges.subscribe(
      (value: string) => console.log(`Email: ${value}`)
    );

    this.password.valueChanges.subscribe(
      (value: string) => console.log(`Password: ${value}`)
    );

    this.loginForm.valueChanges.subscribe(
      (form: any) => console.log(`Form changed to: ${form.email}`)
    );
  }

  ngOnInit() {
  }

  onSubmit(loginForm: any) {
    console.log(loginForm);
    // const email = loginForm.form.controls['email'].value;
    // const pw = loginForm.form.controls['password'].value;
    // this.auth.login(email, pw);
  }

}
