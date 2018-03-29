import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TEAM_MEMBERS } from './../mock-team-members';
import { TeamMember } from './../teamMember';

import { MessageService } from './message.service';

@Injectable()
export class TeamMemberService {

  constructor(private messageService: MessageService) { }

  getTeamMembers(): Observable<TeamMember[]> {
    this.messageService.add('MessageService: fetched team members');
    return of(TEAM_MEMBERS);
  }

  getTeamMember(id: number): Observable<TeamMember> {
    this.messageService.add(`TeamMemberService: fetched team member with id = ${id}`);
    return of(TEAM_MEMBERS.find(tm => tm.id === id));
  }

}
