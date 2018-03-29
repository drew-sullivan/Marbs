import { Component, OnInit, Input } from '@angular/core';

import { TeamMember } from '../teamMember';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.css']
})
export class TeamMemberDetailComponent implements OnInit {

  @Input() teamMember: TeamMember;

  constructor() { }

  ngOnInit() {
    console.log(this.teamMember);
  }

}
