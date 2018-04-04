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
  columnSorted: string;
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

  sortByCol(colName: string) {
    switch (colName) {
      case 'name':
        this.teamMembers = this.teamMembers.sort(byNameAsc);
        break;
      case 'numDays':
        if (this.areSortedNums) {
          this.teamMembers = this.teamMembers.sort(byNumDaysAsc);
          this.areSortedNums = false;
        } else {
          this.teamMembers = this.teamMembers.sort(byNumDaysDesc);
          this.areSortedNums = true;
        }
        break;
      case 'dates':
        if (this.areSortedDates) {
          this.teamMembers = this.teamMembers.sort(byDateAsc);
          this.areSortedDates = false;
        } else {
          this.teamMembers = this.teamMembers.sort(byDateDesc);
          this.areSortedDates = true;
        }
        break;
      default:
        console.log('Something went wrong!');
    }
  }

}

const byNameAsc = (tm1: TeamMember, tm2: TeamMember) => tm1.name.localeCompare(tm2.name);

const byNumDaysAsc = (tm1: TeamMember, tm2: TeamMember) => {
  return tm1.datesTakenOff.length - tm2.datesTakenOff.length;
};

const byNumDaysDesc = (tm1: TeamMember, tm2: TeamMember) => {
  return tm2.datesTakenOff.length - tm1.datesTakenOff.length;
};

const byDateAsc = (tm1: TeamMember, tm2: TeamMember) => {
  return moment(tm1.datesTakenOff[0]).diff(moment(tm2.datesTakenOff[0]));
};

const byDateDesc = (tm1: TeamMember, tm2: TeamMember) => {
  return moment(tm2.datesTakenOff[0]).diff(moment(tm1.datesTakenOff[0]));
};
