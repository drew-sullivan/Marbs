import { Component, OnInit } from '@angular/core';

import { TeamMemberService } from './../services/team-member.service';
import { TeamMember } from './../teamMember';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teamMembers: TeamMember[] = [];

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  getTeamMembers(): void {
    this.teamMemberService.getTeamMembers()
      .subscribe(teamMembers => this.teamMembers = teamMembers);
  }

}
