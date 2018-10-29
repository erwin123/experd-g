import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../services/statemanagement.service';
import { ProblemidentifyService } from '../services/problemidentify.service'
import { ProblemIdentify, Solution, Execution } from '../model';
import { SolutionService } from '../services/solution.service';

@Component({
  selector: 'app-stepboard',
  templateUrl: './stepboard.component.html',
  styleUrls: ['./stepboard.component.css']
})
export class StepboardComponent implements OnInit {

  empInfo: any;
  puInfo: any;
  isCoach: boolean = false;
  pi: ProblemIdentify = new ProblemIdentify();
  so: Solution = new Solution();
  ex: Execution = new Execution();
  soSkip: string = '0';
  soSkip1: string = '0';
  soSkip2: string = '0';
  soSkip3: string = '0';
  constructor(private stateService: StatemanagementService, private piService: ProblemidentifyService,
    private soService: SolutionService) { }

  ngOnInit() {
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.isCoach = true;
    }
    this.empInfo = this.stateService.getStoredEmployee();
    this.puInfo = this.stateService.getStoredProject();
    this.getLastDoc();
  }

  getLastDoc() {
    this.piService.getPi(this.empInfo.UserCode, this.puInfo.ProjectCode).subscribe(res => {
     
      if (res.length >0) {
        this.pi = res[res.length - 1];
        this.pi.Complete = this.pi.Complete.toString();
        if (this.pi.Complete.toString() === '0') {
          return;
        }
      }
      else{
        this.pi = new ProblemIdentify();
      }

      this.soService.getSolutionUser(this.empInfo.UserCode).subscribe(res => {
        // this.so = res.find(i => i.Complete.toString() === "1" && i.ActionOrder === 1);
        // if (!this.so) {
        //   return;
        // }
        // this.soSkip1 = '1';
        this.checkSkip(res, 1);
        this.checkSkip(res, 2);
        this.checkSkip(res, 3);
      })
    }, errPi => {
      console.log("Error while fetch pi");
    })
  }

  checkSkip(so:Solution[], step:number){
    let soLoc:Solution = new Solution();
    soLoc = so.find(i => i.ActionOrder === step);
    if (!soLoc) {
      return;
    }
    if(step === 1)
      this.soSkip1 = '1';
    if(step === 2)
      this.soSkip2 = '2';
    if(step === 3)
      this.soSkip3 = '3';
  }

  getLastSo() {

  }
}
