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
        this.so = res.find(i => i.Complete.toString() === "1");
        if (!this.so) {
          return;
        }
        this.soSkip = '1';
      })
    }, errPi => {
      console.log("Error while fetch pi");
    })
  }

  getLastSo() {

  }
}
