import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TeamMember } from './../teamMember';
import { Transaction } from './Transaction';
import { TeamMemberService } from './../services/team-member.service';

@Component({
  selector: 'app-cash-in-form',
  templateUrl: './cash-in-form.component.html',
  styleUrls: ['./cash-in-form.component.css']
})
export class CashInFormComponent implements OnInit {

  @Input() tm: TeamMember;
  @Output() transactionSubmitted = new EventEmitter<Transaction>();
  t = new Transaction(null, '');
  submitted = false;

  constructor(private tmService: TeamMemberService) { }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }

  updateUser(input: any): void {
    // console.log(input);
    this.tm.halfDaysBanked = this.tm.halfDaysBanked - input.numHalfDays;
    this.tm.datesTakenOff.push(input.selectedDate);
    this.tmService.updateTeamMember(this.tm);
    this.transactionSubmitted.emit(input);
  }

}
