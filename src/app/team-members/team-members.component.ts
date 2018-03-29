import { Component, OnInit } from '@angular/core';

import { TeamMember } from './../teamMember';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  teamMember: TeamMember = {
    id: 1,
    name: 'Drew Sullivan',
    marblesEarned: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
