import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detail/:id', component: TeamMemberDetailComponent },
  { path: 'team-members', component: TeamMembersComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
