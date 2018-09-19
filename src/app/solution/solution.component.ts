import { Component, OnInit, Input } from '@angular/core';
import { Solution, Email } from '../model';
import { ToastrService } from 'ngx-toastr';
import { StatemanagementService } from '../services/statemanagement.service';
import { SolutionService } from '../services/solution.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { MailerService } from '../services/mailer.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  @Input() documentCode: string = "";
  @Input() solutionTitle: string = "";
  @Input() complete: boolean = false;
  @Input() actionOrder:number=0;
  solution: Solution = new Solution();
  puInfo: any;
  empInfo: any;
  error: boolean = false;
  errorMsg: string = "";
  myCoach: any;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    sunHighlight: true,
    inline: false,
    satHighlight: true,
    editableDateField: false,
    selectorHeight: "255px",
    selectorWidth: "275px",
    openSelectorOnInputClick: true
  };

  isCoach: boolean = false;

  constructor(private mailer: MailerService, private toastr: ToastrService, private solutionService: SolutionService, private stateService: StatemanagementService) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredEmployee();
    this.puInfo = this.stateService.getStoredProject();

    this.getSolution();
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.isCoach = true;
    } else {
      this.myCoach = this.stateService.getStoredMyCoach();
    }
  }

  getSolution() {
    this.solutionService.getSolution(this.empInfo.UserCode, this.documentCode).subscribe(res => {
      this.solution = res;
      let date = res.Deadline.split('T')[0];
      let deadlineview: any = { date: { year: +date.split('-')[0], month: +date.split('-')[1], day: +date.split('-')[2] } };
      this.solution.Deadline = deadlineview;
    }, err => {
      //no data
      this.solution = new Solution();
    });
  }

  onDateChanged(event: IMyDateModel) {

    console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }

  submit() {

    let solution: Solution = new Solution();
    solution.Deadline = this.solution.Deadline.formatted;
    solution.Solution = this.solution.Solution;
    solution.Target = this.solution.Target;
    solution.CreatedBy = this.empInfo.Username;
    solution.UserCode = this.empInfo.UserCode;
    solution.ProjectCode = this.puInfo.ProjectCode;
    solution.ActionOrder = this.actionOrder;
    if (this.solution.Solution && this.solution.Target && this.solution.Deadline) {
      if (this.solution.DocumentCode) {
        solution.DocumentCode = this.solution.DocumentCode;
        if (!this.solution.Deadline.formatted) {
          let month = "0" + this.solution.Deadline.date.month;
          let day = "0" + this.solution.Deadline.date.day;
          solution.Deadline = this.solution.Deadline.date.year + "-" + month.substr(month.length - 2) + "-" + day.substr(day.length - 2)
        }
        this.solutionService.putSolution(solution).subscribe(res => {
          this.getSolution();
          this.toastr.success('', 'Solution berhasil tersimpan');
        });
      } else {
        this.solutionService.postSolution(solution).subscribe(res => {
          this.documentCode = res.DocumentCode;
          this.getSolution();
          this.toastr.success('', 'Solution berhasil tersimpan');
        });
      }

      let mail: Email = new Email();
      mail.MessageSubject = this.empInfo.Name + " membuat sebuah Solusi";
      mail.MessageBody = "<b>Hai " + this.myCoach.Name + ", </b><br/> " + this.empInfo.Name + " membuat sebuah Solution & Plan.";
      mail.MessageFrom = "ExperdGuide - Solution & Plan Notification <guide@experd.com>";
      mail.MessageTo = this.myCoach.Email;
      mail.MessageCc = this.empInfo.Email;
      this.mailer.sendMail(mail).subscribe(resmail => {
        console.log("Mail Sent");
      }, errMail => {
        console.log("Failed sending mail");
      })
    } else {
      this.error = true;
      this.errorMsg = "Mohon lengkapi semua isian";
      setTimeout(() => {
        this.error = false;
        this.errorMsg = "";
      }, 5000);
    }
  }

}
