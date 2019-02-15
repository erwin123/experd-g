import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatemanagementService } from '../services/statemanagement.service';
import { ProblemidentifyService } from '../services/problemidentify.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ProblemIdentify, Email } from '../model';
import * as globalVar from '../global';
import { MailerService } from '../services/mailer.service';

@Component({
  selector: 'app-stepone',
  templateUrl: './stepone.component.html',
  styleUrls: ['./stepone.component.css']
})
export class SteponeComponent implements OnInit {
  pdfSrc: string = globalVar.storagePdf;
  page: number = 1;
  totalPages: number = 0;
  pdfFile: File = null;
  traffic: boolean = false;
  progress: number = 0;
  empInfo: any;
  PUInfo: any;
  longAnswer: string = "";
  longAnswerCommit: string = "";

  isComplete: boolean = false;
  isCoach: boolean = false;
  pi: ProblemIdentify = new ProblemIdentify();
  myCoach: any;

  constructor(private toastr: ToastrService, private piService: ProblemidentifyService
    , private stateService: StatemanagementService, private mailer: MailerService) { }

  ngOnInit() {
    this.stateService.currentExistTraffic.subscribe(res => {
      this.traffic = res;
    });

    this.stateService.currentNumberProgrees.subscribe(res => {
      this.progress = res;
    });
    this.empInfo = this.stateService.getStoredEmployee();
    this.PUInfo = this.stateService.getStoredProject();
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.isCoach = true;
      this.PUInfo = this.stateService.getStoredSelectedProject();
    } else {
      this.myCoach = this.stateService.getStoredMyCoach();
    }

    
    this.getPi();
  }

  getPi() {
    this.piService.getPi(this.empInfo.UserCode, this.PUInfo.ProjectCode).subscribe(res => {

      if (res.length > 0) {
        this.pi = res[res.length - 1]; //get last
        this.isComplete = this.pi.Complete.toString() === "1" ? true : false;
        this.longAnswerCommit = this.pi.Commit;
      }
      this.pdfSrc = this.pdfSrc + this.pi.Filename;
    }, err =>{
      this.stateService.redirectLogin();
    });
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pdfFile = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
        if(this.pdfFile.name.split('.')[this.pdfFile.name.split('.').length-1] !== 'pdf'){
          this.pdfFile = null;
          this.toastr.error('', 'Anda harus memilih file pdf');
        }
      }
      
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    if (this.pdfFile == null) {
      this.toastr.warning('', 'Anda belum memilih dokumen pdf');
      return;
    }
    if (this.longAnswer === "") {
      this.toastr.warning('', 'Anda harus mengisi identifikasi masalah');
      return;
    }
    this.isComplete = true;
    this.stateService.setTraffic(true);
    // let pi: ProblemIdentify = new ProblemIdentify();
    // pi.CreatedBy = this.empInfo.Username;
    // pi.Filename = "";
    // pi.ProjectCode = this.PUInfo.ProjectCode;
    // pi.UserCode = this.empInfo.UserCode;
    // pi.Description = this.longAnswer;
    // pi.Complete = "0";
    // this.piService.postPi(pi).subscribe(res => {
    //   let mail: Email = new Email();
    //   mail.MessageSubject = this.empInfo.Name + " membuat sebuah Problem Identification";
    //   mail.MessageBody = "<b>Hai " + this.myCoach.Name + ", </b><br/> " + this.empInfo.Name + " membuat sebuah Problem Identification.";
    //   mail.MessageFrom = "ExperdGuide - Problem Identification Notification <guide@experd.com>";
    //   mail.MessageTo = this.myCoach.Email;
    //   mail.MessageCc = this.empInfo.Email;
    //   this.mailer.sendMail(mail).subscribe(resmail => {
    //     this.stateService.setTraffic(false);
    //     this.toastr.success('', 'Dokumen berhasil tersimpan');
    //     this.longAnswer = "";
    //     this.getPi();
    //   }, errMail => {
    //     console.log("Failed sending mail");
    //     this.stateService.setTraffic(false);
    //     this.toastr.success('', 'Dokumen berhasil tersimpan');
    //     this.longAnswer = "";
    //     this.getPi();
    //   })
    // }, errPi =>{
    //   this.isComplete = false;
    // })

    this.piService.uploadPdf(this.pdfFile).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        if (percentDone < 95)
          this.stateService.setProgress(percentDone);
      }
      let resultFilename: any;
      if (event instanceof HttpResponse) {
        resultFilename = event.body;
        let pi: ProblemIdentify = new ProblemIdentify();
        pi.CreatedBy = this.empInfo.Username;
        pi.Filename = resultFilename.filename;
        pi.ProjectCode = this.PUInfo.ProjectCode;
        pi.UserCode = this.empInfo.UserCode;
        pi.Description = this.longAnswer;
        pi.Complete = "0";
        this.piService.postPi(pi).subscribe(res => {
          console.log(res);
          this.stateService.setTraffic(false);
          this.toastr.success('', 'Dokumen berhasil tersimpan');
        })

      }
    }, err => {
      this.stateService.setTraffic(false);
      this.toastr.error('', 'Terjadi kesalahan jaringan');
    });
  }

  onComplete() {

    let adm: any;
    adm = this.stateService.getStoredADM();
    if (!this.pi) {
      this.toastr.warning('', 'Belum ada identifikasi masalah dari Coachy');
      return;
    }

    this.stateService.setTraffic(true);
    this.pi.Complete = "1";
    this.pi.Commit = this.longAnswerCommit;
    this.pi.CreatedBy = adm.Username;
    this.piService.putPi(this.pi).subscribe(res => {
      let mail: Email = new Email();
      mail.MessageSubject = adm.Name + " menyetujui Problem Identification Anda";
      mail.MessageBody = "<b>Hai " + this.empInfo.Name + ", </b><br/> " +  adm.Name + " menyetujui Problem Identification Anda,<br/>saatnya Anda lanjut ke step berikutnya yakni membuat solusi dan target.";
      mail.MessageFrom = "ExperdGuide - Problem Identification Notification <guide@experd.com>";
      mail.MessageTo = this.empInfo.Email;
      mail.MessageCc = adm.Email;
      this.mailer.sendMail(mail).subscribe(resmail => {
        this.stateService.setTraffic(false);
        this.toastr.success('', 'Problem Identification Complete!');
        this.longAnswerCommit = "";
        this.getPi();
      }, errMail => {
        console.log("Failed sending mail");
        this.stateService.setTraffic(false);
        this.toastr.success('', 'Problem Identification Complete!');
        this.longAnswerCommit = "";
        this.getPi();
      })
    })
  }

  onUnComplete() {

    let adm: any;
    adm = this.stateService.getStoredADM();
    if (!this.pi) {
      this.toastr.warning('', 'Belum ada identifikasi masalah dari Coachy');
      return;
    }

    this.stateService.setTraffic(true);
    this.pi.Complete = "0";
    this.pi.Commit ="";
    this.pi.CreatedBy = adm.Username;
    this.piService.putPi(this.pi).subscribe(res => {
      this.stateService.setTraffic(false);
        this.toastr.success('', 'Problem Identification Un Complete!');
        this.longAnswerCommit = "";
        this.getPi();
    })
  }
}
