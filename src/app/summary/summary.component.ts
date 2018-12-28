import { Component, OnInit } from '@angular/core';
import { ProblemidentifyService } from '../services/problemidentify.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { ProblemIdentify, Solution } from '../model';
import { SolutionService } from '../services/solution.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  empInfo: any;
  PUInfo: any;
  solutions: Solution[];
  pi: ProblemIdentify = new ProblemIdentify();
  constructor(private piService: ProblemidentifyService
    , private stateService: StatemanagementService
    , private solutionService: SolutionService) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredEmployee();
    this.PUInfo = this.stateService.getStoredProject();
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.PUInfo = this.stateService.getStoredSelectedProject();
    }
    this.getPi();
    this.getSolution();
  }

  getPi() {
    this.piService.getPi(this.empInfo.UserCode, this.PUInfo.ProjectCode).subscribe(res => {
      if(res.length>0)
      this.pi = res[res.length - 1]; //get last
      
    });
  }

  getSolution() {
    this.solutionService.getSolutionUser(this.empInfo.UserCode).subscribe(res => {
      this.solutions = res;
      for (let i = 0; i < 3; i++) {
        if(!this.solutions[i]){
          let sols:Solution = new Solution();
          this.solutions.push(sols);
        }
        console.log(this.solutions);
      }
    }, err => {
      //no data
    });
    
  }
}
