import { Component, OnInit } from '@angular/core';

import { TeamMember } from './../teamMember';
import { TeamMemberService } from './../services/team-member.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  teamMembers: TeamMember[];

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  getTeamMembers(): void {
     this.teamMemberService.getTeamMembers()
      .subscribe(teamMembers => this.teamMembers = teamMembers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.teamMemberService.addTeamMember({ name } as TeamMember)
      .subscribe(tm => this.teamMembers.push(tm));
  }

}
