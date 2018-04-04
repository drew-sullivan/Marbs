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

  private teamMembersUrl = 'api/teamMembers';  // URL to web api

  constructor(
    private http: HttpClient,
    private toast: ToastService) { }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.teamMembersUrl).pipe(
        catchError(this.handleError('getTeamMembers', []))
      );
  }

  getTeamMember(id: number): Observable<TeamMember> {
    const url = `${this.teamMembersUrl}/${id}`;
    return this.http.get<TeamMember>(url).pipe(
      catchError(this.handleError<TeamMember>(`getTeamMember with id = ${id}`))
    );
  }

  updateTeamMember(teamMember: TeamMember): Observable<any> {
    return this.http.put(this.teamMembersUrl, teamMember, httpOptions).pipe(
      tap(_ => this.log(`Updated ${teamMember.name}'s information`)),
      catchError(this.handleError<any>('updateTeamMember'))
    );
  }

  addTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.teamMembersUrl, teamMember, httpOptions).pipe(
      tap((tm: TeamMember) => this.log(`Added team member ${tm.name}`)),
      catchError(this.handleError<TeamMember>('addTeamMember'))
    );
  }

  deleteTeamMember(tm: TeamMember | number): Observable<TeamMember> {
    const id = typeof tm === 'number' ? tm : tm.id;
    const url = `${this.teamMembersUrl}/${id}`;

    return this.http.delete<TeamMember>(url, httpOptions).pipe(
      tap(_ => this.log(`Deleted team member with id = ${id}`)),
      catchError(this.handleError<TeamMember>('deleteTeamMember'))
    );
  }

  searchTeamMembers(term: string): Observable<TeamMember[]> {
    if (!term.trim()) { return of([]); }
    return this.http.get<TeamMember[]>(`api/teamMembers/?name=${term}`).pipe(
      catchError(this.handleError<TeamMember[]>('searchTeamMembers', []))
    );
  }

  private log(message: string) {
    this.toast.showSuccess(`${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
