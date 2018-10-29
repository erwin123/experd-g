import { Component, OnInit } from '@angular/core';
import { Solution, Email } from '../model';
import { StatemanagementService } from '../services/statemanagement.service';
import { SolutionService } from '../services/solution.service';
import { ToastrService } from 'ngx-toastr';
import { MailerService } from '../services/mailer.service';

@Component({
  selector: 'app-steptwo',
  templateUrl: './steptwo.component.html',
  styleUrls: ['./steptwo.component.css']
})
export class SteptwoComponent implements OnInit {
  empInfo: any;
  isCoach: boolean = false;
  solutions: Array<Solution> = new Array<Solution>();
  complete: boolean = false;
  constructor(private mailer: MailerService, private toastr: ToastrService, private solutionService: SolutionService,
    private stateService: StatemanagementService) {

  }
  ngOnInit() {
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.isCoach = true;
    }
    this.empInfo = this.stateService.getStoredEmployee();
    this.getSolution();

  }

  getSolution() {
    this.solutionService.getSolutionUser(this.empInfo.UserCode).subscribe(res => {
      //this.solutions = res;
      for (let i = 0; i < 3; i++) {
        let sols: Solution = new Solution();
        this.solutions.push(sols);
      }

      this.solutions.forEach((e,i) =>{
        res.forEach((e1) =>{
          if(e1.ActionOrder === i+1){
            this.solutions[i] = e1
          }
        })
      })

      let solution: Solution = new Solution();
      solution = res.find(i => i.Complete.toString() === "1");
      if (!solution) {
        return;
      }
      this.complete = true;
    }, err => {
      this.stateService.redirectLogin();
    });

  }

  onComplete() {
    let so: Solution = new Solution();
    for (let i = 0; i < 3; i++) {
      if (this.solutions[i].DocumentCode) {
        so = this.solutions[i];
        break;
      }
    }

    let adm: any;
    adm = this.stateService.getStoredADM();
    if (!so.DocumentCode) {
      this.toastr.warning('', 'Belum ada solusi dan target dari Coachy');
      return;
    }

    this.stateService.setTraffic(true);
    so.Complete = "1";
    so.CreatedBy = adm.Username;
    this.solutionService.putSolution(so).subscribe(res => {
      let mail: Email = new Email();
      mail.MessageSubject = adm.Name + " menyetujui Solusi dan Target Anda";
      mail.MessageBody = "<b>Hai " + this.empInfo.Name + ", </b><br/> " + adm.Name + " menyetujui Solusi dan Target Anda,<br/>saatnya Anda lanjut ke step berikutnya yakni membuat Eksekusi.";
      mail.MessageFrom = "ExperdGuide - Solusi dan Target Notification <guide@experd.com>";
      mail.MessageTo = this.empInfo.Email;
      mail.MessageCc = adm.Email;
      this.mailer.sendMail(mail).subscribe(resmail => {
        this.stateService.setTraffic(false);
        this.toastr.success('', 'Step Solusi dan Target dari ' + this.empInfo.Name + ' sudah selesai.');
        this.getSolution();
      }, errMail => {
        console.log("Failed sending mail");
        this.stateService.setTraffic(false);
        this.toastr.success('', 'Step Solusi dan Target dari ' + this.empInfo.Name + ' sudah selesai.');
        this.getSolution();
      })

    })
  }

}
