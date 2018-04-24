import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TeamMember } from './../teamMember';

import { ToastService } from './toast.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamMemberService {

  public teamMembersUrl = 'http://dev-029666.onbase.net:9876/api/teamMembers';  // URL to web api

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private auth: AuthService) { }

  getTeamMembers(): Observable<TeamMember[]> {
    this.auth.currentUser = {
      email: 'manager',
      pw: 'password'
    };
    const body = {
      username: this.auth.currentUser.email,
      password: this.auth.currentUser.pw
    };
    return this.http.post<ServerResponse>(this.teamMembersUrl, body, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getTeamMembers', []))
      );
  }

  // getTeamMembers(): Observable<TeamMember[]> {
  //   return this.http.get<ServerResponse>(this.teamMembersUrl)
  //     .pipe(
  //       map(response => response.data),
  //       catchError(this.handleError('getTeamMembers', []))
  //     );
  // }

  getTeamMember(id: number): Observable<TeamMember> {
    this.auth.currentUser = {
      email: 'manager',
      pw: 'password'
    };
    const body = {
      username: this.auth.currentUser.email,
      password: this.auth.currentUser.pw,
      id
    };
    return this.http.post<ServerResponse>(this.teamMembersUrl, body, httpOptions).pipe(
      map(response => response.data[0]),
      catchError(this.handleError<TeamMember>(`getTeamMember with id = ${id}`))
    );
  }

  addTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    this.auth.currentUser = {
      email: 'manager',
      pw: 'password'
    };
    const body: any = teamMember;
    body.username = 'manager';
    body.password = 'password';
    return this.http.post<ServerResponse>(this.teamMembersUrl + `/create`, body, httpOptions).pipe(
      map(response => response.data),
      tap((tm: TeamMember) => this.toast.showSuccess(`Added team member ${tm.name}`)),
      catchError(this.handleError<TeamMember>('addTeamMember'))
    );
  }

  updateTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    this.auth.currentUser = {
      email: 'manager',
      pw: 'password'
    };
    const body: any = teamMember;
    body.username = 'manager';
    body.password = 'password';
    return this.http.put<ServerResponse>(this.teamMembersUrl, body).pipe(
      map(response => response.data),
      catchError(this.handleError<TeamMember>('updateTeamMember'))
    );
  }

  deleteTeamMember(tm: TeamMember): Observable<TeamMember> {
    this.auth.currentUser = {
      email: 'manager',
      pw: 'password'
    };
    const body = {
      username: this.auth.currentUser.email,
      password: this.auth.currentUser.pw,
      id: tm.id
    };
    return this.http.post<ServerResponse>(this.teamMembersUrl + '/delete', body, httpOptions).pipe(
      map(response => response.data ),
      tap(_ => this.toast.showSuccess(`Deleted ${tm.name}`)),
      catchError(this.handleError<TeamMember>('deleteTeamMember'))
    );
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.toast.showError(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

export class ServerResponse {
  public data;
  public error;
}
