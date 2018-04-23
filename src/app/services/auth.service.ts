import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TeamMemberService, ServerResponse } from './team-member.service';

@Injectable()
export class AuthService {

  currentUser: any;

  constructor(private teamMemberService: TeamMemberService, private http: HttpClient) { }

  login(formEmail: string, formPassword: string): void {
    // WIP:
    // let email = this.http.get<ServerResponse>(this.teamMemberService.teamMembersUrl).subscribe();
    // const pw = this.http.get<ServerResponse>(this.teamMemberService.teamMembersUrl).subscribe();
    // if (formEmail === email) {
    //   this.currentUser = {
    //     email,
    //     pw
    //   };
    // }
    this.currentUser = {
      email: formEmail,
      password: formPassword
    };
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<ServerResponse>(this.teamMemberService.teamMembersUrl)
      .pipe(
        map(response => response.data),
        catchError(this.teamMemberService.handleError('isLoggedIn', []))
      );
  }

}
