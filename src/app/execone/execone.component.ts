import { Component, OnInit, Input } from '@angular/core';
import { Banner, Solution } from '../model';
import { StatemanagementService } from '../services/statemanagement.service';
import { ToastrService } from 'ngx-toastr';
import { ExecutionService } from '../services/execution.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Execution } from '../model';
import * as globalVar from '../global';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SolutionService } from '../services/solution.service';

@Component({
  selector: 'app-execone',
  templateUrl: './execone.component.html',
  styleUrls: ['./execone.component.css']
})
export class ExeconeComponent implements OnInit {
  @Input() step: string = "";
  @Input() executionTitle: string = "";
  imgRwd: File;
  imgs: Array<Banner> = new Array();
  imageSrc: string;
  loadedPhoto: boolean = false;
  empInfo: any;
  PUInfo: any;
  longAnswer: string = "";
  ex: Array<Execution> = new Array();
  ex1: Execution = new Execution();
  isCoach: boolean = false;
  random: number = 0;
  solution: Solution = new Solution();

  pdfSrc: string = globalVar.storagePdf;
  page: number = 1;
  totalPages: number = 0;
  pdfFile: File = null;

  constructor(private router: Router, private stateService: StatemanagementService, private toastr: ToastrService
    , private execService: ExecutionService, private loginService: LoginService, private solutionService: SolutionService) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredEmployee();
    this.PUInfo = this.stateService.getStoredProject();
    this.getEx();
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.isCoach = true;
    }
    this.random = Math.floor(Math.random() * 3) + 1;
    this.getSolution();
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }

  getEx() {
    this.execService.getEx(this.empInfo.UserCode, this.PUInfo.ProjectCode, this.step).subscribe(res => {
      if (res.length > 0) {
        this.ex1 = res[res.length - 1];
        this.longAnswer = this.ex1.Description;
      }
      this.pdfSrc = this.pdfSrc + this.ex1.Filename;

      // if (res.length > 0) {
      //   this.ex.forEach((val, idx) => {
      //     let bans: Banner = new Banner();
      //     bans.BannerDesc = val.Description;
      //     bans.BannerPath = globalVar.storagePhoto + val.Filename;
      //     this.imgs.push(bans);
      //   })
      // }
    }, err => {
      this.loginService.logout();
      this.stateService.setParamChange(false);
      this.router.navigate(['/']);
    });
  }

  getSolution() {
    this.solutionService.getSolutionActionOrder(this.empInfo.UserCode, this.step).subscribe(res => {
      this.solution = res;
      console.log(res);
      let date = res.Deadline.split('T')[0];
      // let deadlineview: any = { date: { year: +date.split('-')[0], month: +date.split('-')[1], day: +date.split('-')[2] } };
      this.solution.Deadline = date;
      console.log(res);
    }, err => {
      //no data
      this.solution = new Solution();
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.pdfFile = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
        if (this.pdfFile.name.split('.')[this.pdfFile.name.split('.').length - 1] !== 'pdf') {
          this.pdfFile = null;
          this.toastr.error('', 'Anda harus memilih file pdf');
        }
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    if (this.longAnswer === "" || this.pdfFile == null) {
      this.toastr.warning('', 'Anda belum mengisi deskripsi eksekusi atau belum memilih dokumen');
      return;
    }
    this.stateService.setTraffic(true);
    this.execService.uploadDoc(this.pdfFile).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        if (percentDone < 95)
          this.stateService.setProgress(percentDone);
      }
      let resultFilename: any;

      if (event instanceof HttpResponse) {
        resultFilename = event.body;
        let ex: Execution = new Execution();
        ex.CreatedBy = this.empInfo.Username;
        ex.Filename = resultFilename.filename;
        ex.ProjectCode = this.PUInfo.ProjectCode;
        ex.UserCode = this.empInfo.UserCode;
        ex.Description = this.longAnswer;
        ex.Step = this.step;
        ex.Complete = "0";
        this.execService.postEx(ex).subscribe(res => {
          this.router.navigate(['main/stepboard']);
          this.stateService.setTraffic(false);
          this.toastr.success('', 'Dokumen berhasil tersimpan');
        })

      }
    }, err => {
      this.stateService.setTraffic(false);
      this.toastr.error('', 'Terjadi kesalahan jaringan');
    });
  }
}
