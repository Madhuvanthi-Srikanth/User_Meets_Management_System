import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackPopupComponent } from './feedback-popup/feedback-popup.component';
// import { LeadHomeComponent } from './lead-home/lead-home.component';
import { LeadProfileComponent } from './lead-profile/lead-profile.component';
import { LeadSearchComponent } from './lead-search/lead-search.component';

const routes: Routes = [
  {
    path:'leads',
    component: LeadSearchComponent
  },
  {
    path:'leads',
    component: LeadProfileComponent
  },
  {
    path:'leads',
    component: LeadSearchComponent
  },
  
  { 
    path: 'signup',
    component: SignupComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
 
  {
    path: 'feedback',
    component: FeedbackPopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  SignupComponent,
  LoginComponent,
  IndexComponent,
  HomeComponent,
  ProfileComponent,
  FeedbackPopupComponent
]
