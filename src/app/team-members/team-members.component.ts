import { Component, OnInit } from '@angular/core';

import { TeamMember } from './../teamMember';
import { TEAM_MEMBERS } from './../mock-team-members';

import { TeamMemberService } from './../services/team-member.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  teamMembers: TeamMember[];
  selectedTeamMember: TeamMember;

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  getTeamMembers(): void {
     this.teamMemberService.getTeamMembers()
      .subscribe(teamMembers => this.teamMembers = teamMembers);
  }

  onSelect(teamMember: TeamMember): void {
    this.selectedTeamMember = teamMember;
  }

}
