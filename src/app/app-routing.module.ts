import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/team-members', pathMatch: 'full' },
  { path: 'detail/:id', component: TeamMemberDetailComponent },
  { path: 'team-members', component: TeamMembersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
