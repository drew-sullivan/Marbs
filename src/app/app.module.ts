import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { CashInFormComponent } from './cash-in-form/cash-in-form.component';

import { AppRoutingModule } from './/app-routing.module';

import { ToastService } from './services/toast.service';
import { TeamMemberService } from './services/team-member.service';
import { InMemoryDataService } from './in-memory-data.service';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { MomentModule } from 'angular2-moment';
import { ClickOutsideModule } from 'ng4-click-outside';

import * as bootstrap from 'bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TeamMembersComponent,
    TeamMemberDetailComponent,
    CashInFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MomentModule,
    ClickOutsideModule,
    ToastModule.forRoot()
  ],
  providers: [TeamMemberService, ToastService, InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
