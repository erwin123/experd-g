import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { DrawerComponent } from './drawer/drawer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { NguCarouselModule } from '@ngu/carousel';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AuthguardService } from './services/authguard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StepboardComponent } from './stepboard/stepboard.component';
import { SteponeComponent } from './stepone/stepone.component';
import { HeaderStepComponent } from './header-step/header-step.component';
import { CommentComponent } from './comment/comment.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { SteptwoComponent } from './steptwo/steptwo.component';
import { ExeconeComponent } from './execone/execone.component';
import { ExectwoComponent } from './exectwo/exectwo.component';
import { ExecthreeComponent } from './execthree/execthree.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ChpwdComponent } from './chpwd/chpwd.component';
import { ExecutionComponent } from './execution/execution.component';
import { SolutionComponent } from './solution/solution.component';
import { ProjectboardComponent } from './projectboard/projectboard.component';
import { CoachyboardComponent } from './coachyboard/coachyboard.component';
import { SummaryComponent } from './summary/summary.component';
import { ExecsummaryComponent } from './execsummary/execsummary.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LandingComponent,
    DrawerComponent,
    CarouselComponent,
    LoginComponent,
    StepboardComponent,
    SteponeComponent,
    HeaderStepComponent,
    CommentComponent,
    SteptwoComponent,
    ExeconeComponent,
    ExectwoComponent,
    ExecthreeComponent,
    ChpwdComponent,
    ExecutionComponent,
    SolutionComponent,
    ProjectboardComponent,
    CoachyboardComponent,
    SummaryComponent,
    ExecsummaryComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    HttpModule,
    HttpClientModule,
    NguCarouselModule,
    BlockUIModule.forRoot(),
    PdfViewerModule,
    ToastrModule.forRoot(),
    MyDatePickerModule
  ],
  providers: [AuthguardService, {provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
