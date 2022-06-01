import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { FeedbackPopupComponent } from './feedback-popup/feedback-popup.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LeadHomeComponent } from './lead-home/lead-home.component';
import { LeadProfileComponent } from './lead-profile/lead-profile.component';
import { LeadSearchComponent } from './lead-search/lead-search.component';
import { LoginComponent } from './login/login.component';
import { NewMeetFormComponent } from './new-meet-form/new-meet-form.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    ClientHomeComponent,
    FeedbackPopupComponent,
    ClientProfileComponent,
    HeaderComponent,
    HomeComponent,
    IndexComponent,
    LeadHomeComponent,
    LeadProfileComponent,
    LeadSearchComponent,
    LoginComponent,
    NewMeetFormComponent,
    ProfileComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
