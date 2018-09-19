import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { StepboardComponent } from './stepboard/stepboard.component';
import { SteponeComponent } from './stepone/stepone.component';
import { AuthguardService } from './services/authguard.service';
import { SteptwoComponent } from './steptwo/steptwo.component';
import { ExeconeComponent } from './execone/execone.component';
import { ExectwoComponent } from './exectwo/exectwo.component';
import { ExecthreeComponent } from './execthree/execthree.component';
import { ChpwdComponent } from './chpwd/chpwd.component';
import { ExecutionComponent } from './execution/execution.component';
import { ProjectboardComponent } from './projectboard/projectboard.component';
import { CoachyboardComponent } from './coachyboard/coachyboard.component';
import { SummaryComponent } from './summary/summary.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  
  { path: 'main', component: MainComponent,
    children: [
      { path: 'landing', component: LandingComponent, data: { state: 'landing' }},
      { path: 'login', component: LoginComponent, data: { state: 'login' } },
      { path: 'projectboard', component: ProjectboardComponent, canActivate: [AuthguardService], data: { state: 'projectboard' } },
      { path: 'coachy', component: CoachyboardComponent, canActivate: [AuthguardService], data: { state: 'coachyboard' } },
      { path: 'stepboard', component: StepboardComponent, canActivate: [AuthguardService], data: { state: 'stepboard' } },
      { path: 'stepone', component: SteponeComponent, canActivate: [AuthguardService], data: { state: 'stepone' } },
      { path: 'steptwo', component: SteptwoComponent, canActivate: [AuthguardService], data: { state: 'steptwo' } },
      { path: 'execone', component: ExecutionComponent, canActivate: [AuthguardService], data: { state: 'execone' } },
      { path: 'exectwo', component: ExectwoComponent, canActivate: [AuthguardService], data: { state: 'exectwo' } },
      { path: 'execthree', component: ExecthreeComponent, canActivate: [AuthguardService], data: { state: 'execthree' } },
      { path: 'chpwd', component: ChpwdComponent, canActivate: [AuthguardService] , data: { state: 'chpwd' }},
      { path: 'summary', component: SummaryComponent, canActivate: [AuthguardService] , data: { state: 'summary' }},
      { path: 'contact', component: ContactComponent , data: { state: 'contact' }},
  ]},
  //{ path: '', redirectTo: 'main/landing'},

  // otherwise redirect to home
  { path: '**', redirectTo: 'main/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }