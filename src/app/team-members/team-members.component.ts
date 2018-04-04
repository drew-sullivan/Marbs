import { Component, OnInit } from '@angular/core';

import { TeamMember } from './../teamMember';
import { TeamMemberService } from './../services/team-member.service';

import * as moment from 'moment';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  teamMembers: TeamMember[];
  private areSortedNums: boolean;
  private areSortedDates: boolean;

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
    this.teamMemberService.addTeamMember({
      name,
      datesTakenOff: []
    } as TeamMember)
      .subscribe(tm => this.teamMembers.push(tm));
  }

  delete(teamMember: TeamMember): void {
    alert('Are you sure?');
    this.teamMembers = this.teamMembers.filter(tm => tm !== teamMember);
    this.teamMemberService.deleteTeamMember(teamMember).subscribe();
  }

  sortByNameColumn() {
    this.teamMembers = this.teamMembers.sort(
      (tm1: TeamMember, tm2: TeamMember) => tm1.name.localeCompare(tm2.name)
    );
  }

  sortByNumDaysTaken() {
    if (this.areSortedNums) {
      this.teamMembers = this.teamMembers.sort(
        (tm1: TeamMember, tm2: TeamMember) => tm1.datesTakenOff.length - tm2.datesTakenOff.length
      );
      this.areSortedNums = false;
    } else {
      this.teamMembers = this.teamMembers.sort(
        (tm1: TeamMember, tm2: TeamMember) => tm2.datesTakenOff.length - tm1.datesTakenOff.length
      );
      this.areSortedNums = true;
    }
  }

  sortByMostRecentDate() {
    if (this.areSortedDates) {
      this.teamMembers = this.teamMembers.sort(
        (tm1: TeamMember, tm2: TeamMember) =>
          moment(tm1.datesTakenOff[0]).diff(moment(tm2.datesTakenOff[0]))
      );
      this.areSortedDates = false;
    } else {
      this.teamMembers = this.teamMembers.sort(
        (tm1: TeamMember, tm2: TeamMember) =>
          moment(tm2.datesTakenOff[0]).diff(moment(tm1.datesTakenOff[0]))
      );
      this.areSortedDates = true;
    }
  }

}
