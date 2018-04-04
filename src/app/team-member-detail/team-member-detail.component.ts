import { MomentModule } from 'angular2-moment';
import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
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
  private editing: boolean;
  private editingName: boolean;

  constructor(
    private route: ActivatedRoute,
    private teamMemberService: TeamMemberService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getTeamMember();
  }

  getTeamMember(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamMemberService.getTeamMember(id)
      .subscribe(tm => {
        this.teamMember = tm;
        this.teamMember.datesTakenOff = this.teamMember.datesTakenOff.sort(byDate);
      });
  }

  addDate(date: string): void {
    if (date === '') { return; }
    const dates = this.teamMember.datesTakenOff;
    if (dates.length) {
      for (let i = 0; i < dates.length; i++) {
        if (moment(date).diff(moment(dates[i])) > 0 || i === dates.length - 1) {
          dates.splice(i, 0, date);
          break;
        }
      }
    } else {
      dates.push(date);
    }
    this.teamMemberService.updateTeamMember(this.teamMember);
    this.teamMember.datesTakenOff.sort(byDate);
    this.toastService.showSuccess(`Added ${moment(date).format('LL')} to ${this.teamMember.name}'s list of half days taken off`);
  }

  deleteDate(date: string): void {
    const dates = this.teamMember.datesTakenOff;
    const index = dates.findIndex(item => item === date);
    dates.splice(index, 1);
    this.teamMemberService.updateTeamMember(this.teamMember);
    this.toastService.showSuccess(`Removed ${moment(date).format('LL')} from ${this.teamMember.name}'s list of half days taken off`);
  }

  updateDate(newDate: string, index: number): void {
    if (!newDate) {
      return;
    }
    this.teamMember.datesTakenOff[index] = newDate;
    this.teamMember.datesTakenOff.sort(byDate);
    this.teamMemberService.updateTeamMember(this.teamMember);
    this.toastService.showSuccess('Updated date');
    this.editing = !this.editing;
  }

  updateName(oldName: string, newName: string): void {
    let name;
    if (newName) {
      name = newName;
      this.toastService.showSuccess('Updated name');
    } else {
      name = oldName;
    }
    this.teamMember.name = name;
    this.teamMemberService.updateTeamMember(this.teamMember);
    this.editingName = !this.editingName;
  }

}

const byDate = (date1: string, date2: string) => moment(date2).diff(date1);
