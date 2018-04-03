import { MomentModule } from 'angular2-moment';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TeamMember } from '../teamMember';
import { TeamMemberService } from './../services/team-member.service';
import { ToastService } from './../services/toast.service';

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
    private location: Location,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getTeamMember();
  }

  getTeamMember(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamMemberService.getTeamMember(id)
      .subscribe(tm => {
        this.teamMember = tm;
        this.teamMember.datesTakenOff = this.teamMember.datesTakenOff.sort(
          (a: string, b: string) => moment(b).diff(moment(a))
        );
      });
  }

  addDate(date: string): void {
    if (date === '') { return; }
    const dates = this.teamMember.datesTakenOff;
    for (let i = 0; i < dates.length; i++) {
      if (moment(date).diff(moment(dates[i])) > 0 || i === dates.length - 1) {
        dates.splice(i, 0, date);
        break;
      }
    }
    this.teamMemberService.updateTeamMember(this.teamMember);
    this.toastService.showSuccess(`Added ${date} to ${this.teamMember.name}'s list of half days taken off`);
  }

  deleteDate(date: string): void {
    const index = this.teamMember.datesTakenOff.findIndex(item => item === date);
    this.teamMember.datesTakenOff.splice(index, 1);
  }

  goBack(): void {
    this.location.back();
  }

}
