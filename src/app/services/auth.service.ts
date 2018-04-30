import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TeamMemberService, ServerResponse } from './team-member.service';
import { ToastService } from './toast.service';
import { AuthGuardService } from './auth-guard.service';

import { SERVER_URL } from './../../assets/server-url';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService implements OnInit {

  currentUser: any;
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() { }

  login(username: string, password: string): void {
    const body = {
      username,
      password
    };
    this.http.post<ServerResponse>(`${SERVER_URL}/login`, body, httpOptions)
      .pipe(
        map(response => response.data),
        tap((isValid) => this.setUser(isValid, body.username, body.password))
      ).subscribe();
  }

  setUser(isValid, username, password) {
    console.log(isValid);
    if (isValid) {
      this.currentUser = {
        username,
        password
      };
      this.router.navigate(['/team-members']);
    } else {
      this.toastService.showError(`Username or email are invalid`);
    }
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
    this.toastService.showSuccess(`You have successfully logged out!`);
  }

}
