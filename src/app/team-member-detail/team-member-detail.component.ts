import { MomentModule } from 'angular2-moment';
import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  editingDate = -1;
  editingName: boolean;
  outsideClickCount = 0;
  isAddingPreviousDate = false;

  constructor(
    private router: Router,
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
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.teamMember.datesTakenOff.sort(byDate);
    this.toastService.showSuccess(`Added ${moment(date).format('LL')} to ${this.teamMember.name}'s list of half days taken off`);
  }

  deleteDate(date: string): void {
    const dates = this.teamMember.datesTakenOff;
    const index = dates.findIndex(item => item === date);
    dates.splice(index, 1);
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showSuccess(`Removed ${moment(date).format('LL')} from ${this.teamMember.name}'s list of half days taken off`);
  }

  outsideClickSubmitDate(event: any) {
    this.outsideClickCount++;
    if (this.outsideClickCount > 1) {
      this.editingDate = -1;
      this.outsideClickCount = 0;
    }
  }

  outsideClickSubmitName(event: any, oldName: string, newName: string) {
    this.outsideClickCount++;
    if (this.outsideClickCount > 1) {
      this.updateName(oldName, newName);
      this.outsideClickCount = 0;
    }
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
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.editingName = false;
  }

  updateDate(newDate: string, index: number): void {
    if (!newDate) {
      return;
    }
    this.teamMember.datesTakenOff[index] = newDate;
    this.teamMember.datesTakenOff.sort(byDate);
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showSuccess('Updated date');
    this.editingDate = -1;
    this.outsideClickCount = 0;
  }

  updateNumBankedDays(num: number): void {
    if (!num) {
      return;
    }
    this.teamMember.halfDaysBanked -= num;
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showSuccess(`${this.teamMember.name} now has ${this.teamMember.halfDaysBanked} half-day(s) banked`);
  }

  incrementHalfDaysBanked(): void {
    this.teamMember.halfDaysBanked += 1;
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showSuccess('+ 1');
  }

  decrementHalfDaysBanked(): void {
    this.teamMember.halfDaysBanked -= 1;
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showError('- 1');
  }

  deleteTeamMember(tm: TeamMember): void {
    this.teamMemberService.deleteTeamMember(tm).subscribe( () => {
      // TODO: Test how this behaves with a really slow connection to the server
      this.router.navigate(['/team-members']);
    });
  }


  transactionSubmitted(input: any): void {
    $('#bankedDays').modal('hide');
    const numCashedInDays = input.isHalfDay || this.teamMember.halfDaysBanked < 2 ? 1 : 2;
    this.teamMember.halfDaysBanked = this.teamMember.halfDaysBanked - numCashedInDays;
    this.teamMember.datesTakenOff.push(input.selectedDate);
    this.teamMember.datesTakenOff.sort(byDate);
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showSuccess(`Transaction successful!`);
  }

  addPreviousDate(date: string): void {
    this.teamMember.datesTakenOff.push(date);
    this.teamMember.datesTakenOff.sort(byDate);
    this.teamMemberService.updateTeamMember(this.teamMember).subscribe();
    this.toastService.showSuccess('Date added!');
    this.isAddingPreviousDate = false;
  }
}

const byDate = (date1: string, date2: string) => moment(date2).diff(date1);
