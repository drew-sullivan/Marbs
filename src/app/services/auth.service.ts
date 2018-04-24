import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TeamMemberService, ServerResponse } from './team-member.service';

@Injectable()
export class AuthService implements OnInit {

  currentUser: any;
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() { }

  login(username: string, password: string): void {
    this.currentUser = {
      username,
      password
    };
    this.router.navigate(['/team-members']);
  }

  logout(): void {
    this.currentUser = null;
  }

}
