import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  traffic: boolean = false;
  isCoach: boolean = false;
  isProjectSelected: boolean = false;
  constructor(private router: Router, private stateService: StatemanagementService, private loginService: LoginService) { }
  ngOnInit() {

    this.stateService.currentStateLogin.subscribe(res => {
      this.isLogin = res;
    });
    this.stateService.currentExistTraffic.subscribe(res => {
      this.traffic = res;
    });
    
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.isCoach = true;
    }
    this.stateService.projectSelected.subscribe(pr=>{
      if(pr){
        this.isProjectSelected = this.stateService.getStoredSelectedProject() ? true : false;
      }
    })
    this.stateService.paramChange.subscribe(res => {
      if (res) {
        setTimeout(() => {
          adm = this.stateService.getStoredADM();
          if (adm) {
            this.isCoach = true;
          }
        }, 1000);

      }
    });


  }

  logout() {
    this.loginService.logout();
    this.stateService.setParamChange(false);
    this.router.navigate(['/']);
  }
}
