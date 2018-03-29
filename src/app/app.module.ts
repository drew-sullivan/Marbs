import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { TeamMemberService } from './services/team-member.service';


@NgModule({
  declarations: [
    AppComponent,
    TeamMembersComponent,
    TeamMemberDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TeamMemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
