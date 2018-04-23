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

  login(userName: string, password: string): void {
    this.currentUser = {
      userName,
      password
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
