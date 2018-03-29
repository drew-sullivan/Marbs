import { Injectable } from '@angular/core';

import { TEAM_MEMBERS } from './../mock-team-members';
import { TeamMember } from './../teamMember';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TeamMemberService {

  constructor() { }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(TEAM_MEMBERS);
  }

}
