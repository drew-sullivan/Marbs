import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detail/:id', component: TeamMemberDetailComponent },
  { path: 'team-members', component: TeamMembersComponent },
  { path: 'login', component: LoginComponent,
    // canActivate: [AuthGuardService]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
