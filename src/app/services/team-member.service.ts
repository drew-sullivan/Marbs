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

  private teamMembersUrl = 'http://dev-024402.onbase.net:9876/api/teamMembers';  // URL to web api

  constructor(
    private http: HttpClient,
    private toast: ToastService) { }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<ServerResponse>(this.teamMembersUrl)
      .pipe(
        map(response => response.data),
        catchError(this.handleError('getTeamMembers', []))
      );
  }

  getTeamMember(id: number): Observable<TeamMember> {
    const url = `${this.teamMembersUrl}/${id}`;
    return this.http.get<ServerResponse>(url).pipe(
      map(response => response.data),
      catchError(this.handleError<TeamMember>(`getTeamMember with id = ${id}`))
    );
  }

  updateTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    console.log(teamMember);
    return this.http.put<ServerResponse>(this.teamMembersUrl, teamMember, httpOptions).pipe(
      map(response => response.data),
      tap(r => console.log('hi ' + r)),
      tap(_ => this.toast.showSuccess(`Updated ${teamMember.name}'s information`)),
      catchError(this.handleError<TeamMember>('updateTeamMember'))
    );
  }

  addTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    return this.http.post<ServerResponse>(this.teamMembersUrl, teamMember, httpOptions).pipe(
      map(response => response.data),
      tap((tm: TeamMember) => this.toast.showSuccess(`Added team member ${tm.name}`)),
      catchError(this.handleError<TeamMember>('addTeamMember'))
    );
  }

  deleteTeamMember(tm: TeamMember): Observable<TeamMember> {
    const url = `${this.teamMembersUrl}/${tm.id}`;
    return this.http.delete<ServerResponse>(url, httpOptions).pipe(
      map(response => response.data ),
      tap(_ => this.toast.showSuccess(`Deleted ${tm.name}`)),
      catchError(this.handleError<TeamMember>('deleteTeamMember'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.toast.showError(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

class ServerResponse {
  public data; // This variable holds what you want
}


