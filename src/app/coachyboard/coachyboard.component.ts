import { Component, OnInit } from '@angular/core';
import { CncService } from '../services/cnc.service';
import { UserService } from '../services/user.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { Project, User, Cnc, Email } from '../model';
import { join } from 'array-join';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailerService } from '../services/mailer.service';

@Component({
  selector: 'app-coachyboard',
  templateUrl: './coachyboard.component.html',
  styleUrls: ['./coachyboard.component.css']
})
export class CoachyboardComponent implements OnInit {

  projectSelected: Project = new Project();
  cncs: Array<Cnc> = new Array();
  users: Array<User> = new Array();
  empInfo: any;
  userSelected: User = new User();
  modeMove: boolean = false;
  opened: boolean = false;
  usersToMove: Array<User> = new Array();
  coach: Array<User> = new Array();
  reason: string = "";
  sending: boolean = false;
  constructor(private toastr: ToastrService, private router: Router, private cncService: CncService,
    private stateService: StatemanagementService, private userService: UserService,
    private mailer: MailerService) { }

  ngOnInit() {
    this.projectSelected = this.stateService.getStoredSelectedProject();
    this.empInfo = this.stateService.getStoredADM();
    this.getCoachee();
  }

  getCoachee() {
    this.cncService.getCnc(this.empInfo.UserCode, this.projectSelected.ProjectCode).subscribe(res => {
      this.cncs = res;
      this.userService.getUserAll().subscribe(us => {
        this.users = join(res, us, { key: "UserCode" });
      })
    });
  }

  onClick(userCode: string) {
    this.modeMove = false;
    this.userService.getUserCode(userCode).subscribe(res => {
      localStorage.setItem('currentUserD', JSON.stringify(res));
      this.router.navigate(['/main/stepboard']);
    })
  }

  changeToMove($event, paramUser: User) {
    this.users.forEach((element, index) => {
      if (element.UserCode === paramUser.UserCode) {
        paramUser.CheckToMove = $event.target.checked ? true : false;
        this.users[index] = paramUser;
      }
    });

  }

  onMoveClick(param: boolean) {
    this.modeMove = param;
    if (!param) {
      this.users.forEach((element, index) => {
        this.users[index].CheckToMove = false;
      });
    }
  }

  onMoveAction() {
    let coll = this.users.filter(i => i.CheckToMove === true);
    if (coll.length === 0)
      return;
    this.usersToMove = coll;
    this.opened = true;
    this.userService.getCoach().subscribe(res => {
      this.coach = res.filter(i => i.UserCode !== this.empInfo.UserCode);
    });
  }

  onSelectCoach(paramCoach: User) {
    this.sending = true;
    var itemsProcessed = 0;

    this.usersToMove.forEach((element, index) => {
      this.cncService.getCncCurrent(element.UserCode, this.projectSelected.ProjectCode).subscribe(res => {
        let CncObj: Cnc = new Cnc();
        CncObj = res;
        CncObj.CoachCode = paramCoach.UserCode;
        this.cncService.putCnc(CncObj).subscribe(update => {


          itemsProcessed++;
          if (itemsProcessed === this.usersToMove.length) {
            let listCoachee = "";
            this.usersToMove.forEach((el, i) => {
              listCoachee += el.Name + "<br/>"
            });
            let mail: Email = new Email();
            mail.MessageSubject = "ExperdGuide - Transfer coachee dari " + this.empInfo.Name;
            mail.MessageBody = "<b>Hai " + paramCoach.Name + "!</b><br/>Ada tambahan coachee dari " + this.empInfo.Name + ". <br/> " +
              this.empInfo.Name + " berkata : <br/> <h3>" + this.reason + "</h3>" +
              "Berikut coacheenya : <br/>" + listCoachee;
            mail.MessageFrom = "ExperdGuide - " + this.empInfo.Email + " <guide@experd.com>";
            mail.MessageTo = paramCoach.Email;
            mail.MessageCc = this.empInfo.Email;
            this.mailer.sendMail(mail).subscribe(resmail => {
              this.sending = false;
              console.log("Mail sent");
              this.getCoachee();
              this.modeMove = false;
              this.opened = false;
              this.toastr.success('', 'Coachee sudah di transfer');
            }, errMail => {
              console.log("Failed send mail");
              this.getCoachee();
              this.modeMove = false;
              this.opened = false;
              this.toastr.success('', 'Coachee sudah di transfer');
            });
          }

        }, err => {
          this.toastr.error("error update Cnc");
        })
      }, err => {
        this.toastr.error("error fetch data Cnc Current");
      });
    });

  }

}
