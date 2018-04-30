import { AuthService } from './auth.service';
import { Injectable, OnInit } from '@angular/core';
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

  public teamMembersUrl = 'http://RDV-003988.onbase.net:9876/api/teamMembers';  // URL to web api

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private auth: AuthService) { }

  getTeamMembers(): Observable<TeamMember[]> {
    const body = {
      username: this.auth.currentUser.username,
      password: this.auth.currentUser.password
    };
    return this.http.post<ServerResponse>(this.teamMembersUrl, body, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getTeamMembers', []))
      );
  }

  getTeamMember(id: number): Observable<TeamMember> {
    const body = {
      username: this.auth.currentUser.username,
      password: this.auth.currentUser.password,
      id
    };
    return this.http.post<ServerResponse>(this.teamMembersUrl, body, httpOptions).pipe(
      map(response => response.data[0]),
      catchError(this.handleError<TeamMember>(`getTeamMember with id = ${id}`))
    );
  }

  addTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    const body: any = teamMember;
    body.username = this.auth.currentUser.username;
    body.password = this.auth.currentUser.password;
    return this.http.post<ServerResponse>(this.teamMembersUrl + `/create`, body, httpOptions).pipe(
      map(response => response.data),
      tap((tm: TeamMember) => this.toast.showSuccess(`Added team member ${tm.name}`)),
      catchError(this.handleError<TeamMember>('addTeamMember'))
    );
  }

  updateTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    const body: any = teamMember;
    body.username = this.auth.currentUser.username;
    body.password = this.auth.currentUser.password;
    return this.http.put<ServerResponse>(this.teamMembersUrl, body).pipe(
      map(response => response.data),
      catchError(this.handleError<TeamMember>('updateTeamMember'))
    );
  }

  deleteTeamMember(tm: TeamMember): Observable<TeamMember> {
    const body = {
      username: this.auth.currentUser.username,
      password: this.auth.currentUser.password,
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
