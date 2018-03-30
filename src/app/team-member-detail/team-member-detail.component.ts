import { MomentModule } from 'angular2-moment';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TeamMember } from '../teamMember';
import { TeamMemberService } from './../services/team-member.service';

import * as moment from 'moment';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.css']
})
export class TeamMemberDetailComponent implements OnInit {

  @Input() teamMember: TeamMember;
  sortedDates: string[];

  constructor(
    private route: ActivatedRoute,
    private teamMemberService: TeamMemberService,
    private location: Location) { }

  ngOnInit() {
    this.getTeamMember();
  }

  getTeamMember(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamMemberService.getTeamMember(id)
      .subscribe(tm => {
        this.teamMember = tm;
        this.teamMember.datesTakenOff = this.teamMember.datesTakenOff.sort(
          (a: string, b: string) => moment.utc(b).diff(moment.utc(a)));
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.teamMemberService.updateTeamMember(this.teamMember)
      .subscribe(() => this.goBack());
  }

}
