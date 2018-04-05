import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { TeamMemberService } from './services/team-member.service';
import { AppRoutingModule } from './/app-routing.module';
import { ToastService } from './services/toast.service';

import { MomentModule } from 'angular2-moment';
import { ClickOutsideModule } from 'ng4-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    TeamMembersComponent,
    TeamMemberDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MomentModule,
    ClickOutsideModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    ToastModule.forRoot()
  ],
  providers: [TeamMemberService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
