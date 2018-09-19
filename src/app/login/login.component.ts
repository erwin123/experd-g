import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { join } from 'array-join';

import 'rxjs/add/observable/concat';
import { CncService } from '../services/cnc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  lock: boolean = false;
  hasError: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private loginService: LoginService, private stateService: StatemanagementService,
    private userService: UserService, private projectService: ProjectService,
    private cncService: CncService) { }
  username: string = "";
  password: string = "";
  message: string = "";
  returnUrl: string;

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.username == '' || this.password == '') {
      this.hasError = true;
      this.message = "Lengkapi Username dan Password";
      setTimeout(() => {
        this.message = "";
        this.hasError = false;;
      }, 5000);
      return;
    }
    this.stateService.setTraffic(true);
    this.lock = true;

    let pu: any[];

    this.loginService.login(this.username, this.password)
      .subscribe(res => {
        this.userService.getUser().subscribe(user => {
          if (user) {
            this.projectService.getProjectUser(user.UserCode).subscribe(p => {
              pu = p;
              localStorage.setItem('currentPU', JSON.stringify(p[0]));

              if (user.RoleCode === "RL000003") { //coachy
                localStorage.setItem('currentUserD', JSON.stringify(user));
                this.cncService.getCncCurrent(user.UserCode, p[0].ProjectCode).subscribe(c => {
                  this.userService.getUserCode(c.CoachCode).subscribe(co => {
                    localStorage.setItem('myCoach', JSON.stringify(co));
                  }, err =>{
                    this.handleError("Gagal mengambil informasi Coach");
                  })
                }, err => {
                  this.handleError("Username Anda tidak memiliki coach");
                })
                setTimeout(() => {
                  this.stateService.setParamChange(true);
                  this.lock = false;
                  this.stateService.setTraffic(false);
                  this.router.navigate(['/main/stepboard']);
                }, 5000);

              }

              if (user.RoleCode === "RL000002") { //coach
                localStorage.setItem('currentUserADM', JSON.stringify(user));
                this.projectService.getProject().subscribe(proj => {

                  localStorage.setItem('listProject', JSON.stringify(join(pu, proj, { key: "ProjectCode" })));

                  setTimeout(() => {
                    this.stateService.setParamChange(true);
                    this.lock = false;
                    this.stateService.setTraffic(false);
                    this.router.navigate(['/main/projectboard']);
                  }, 4000);

                }, err => {
                  this.handleError("Username Anda tidak memiliki project yang aktif");
                  this.loginService.logout();
                })
              }

            }, err => {
              this.lock = false;
              this.stateService.setTraffic(false);
              this.handleError("Username Anda tidak memiliki project yang aktif");
              this.loginService.logout();
            })


          }
        }, errUser => {
          this.loginService.logout();
          this.lock = false;
          this.stateService.setTraffic(false);
          this.handleError("Terjadi kesalahan jaringan");
        });

      },
        err => {
          this.lock = false;
          this.stateService.setTraffic(false);
          this.handleError("Username atau Password salah");
          this.loginService.logout();
        }
      );
  }

  handleError(msg: string) {
    this.message = msg;
    this.hasError = true;
    this.lock = false;
    this.stateService.setTraffic(false);
    setTimeout(() => {
      this.message = "";
      this.hasError = false;
    }, 3000);
  }
}
