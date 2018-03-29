import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TeamMember } from './../teamMember';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamMemberService {

  private teamMembersUrl = 'api/teamMembers';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.teamMembersUrl)
      .pipe(
        tap(teamMembers => this.log('fetched team members')),
        catchError(this.handleError('getTeamMembers', []))
      );
  }

  getTeamMember(id: number): Observable<TeamMember> {
    const url = `${this.teamMembersUrl}/${id}`;
    return this.http.get<TeamMember>(url).pipe(
      tap(_ => this.log(`fetched team member with id = ${id}`)),
      catchError(this.handleError<TeamMember>(`getTeamMember with id = ${id}`))
    );
  }

  updateTeamMember(teamMember: TeamMember): Observable<any> {
    return this.http.put(this.teamMembersUrl, teamMember, httpOptions).pipe(
      tap(_ => this.log(`updated team member with id = ${teamMember.id}`)),
      catchError(this.handleError<any>('updateTeamMember'))
    );
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
