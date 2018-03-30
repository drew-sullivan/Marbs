import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { TeamMemberService } from './../services/team-member.service';
import { TeamMember } from './../teamMember';

@Component({
  selector: 'app-team-member-search',
  templateUrl: './team-member-search.component.html',
  styleUrls: ['./team-member-search.component.css']
})
export class TeamMemberSearchComponent implements OnInit {

  teamMembers$: Observable<TeamMember[]>;
  private searchTerms = new Subject<string>();

  constructor(private teamMemberService: TeamMemberService, t: ToastsManager, vcr: ViewContainerRef) {
    t.setRootViewContainerRef(vcr);
    t.info('Hi world. New Toast best toast!');
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.teamMembers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.teamMemberService.searchTeamMembers(term))
    );
  }

}
