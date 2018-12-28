import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../model';
import { StatemanagementService } from '../services/statemanagement.service';
import { ExecutionService } from '../services/execution.service';
import { Execution } from '../model';
import * as globalVar from '../global';

@Component({
  selector: 'app-execsummary',
  templateUrl: './execsummary.component.html',
  styleUrls: ['./execsummary.component.css']
})
export class ExecsummaryComponent implements OnInit {
  @Input() step: string = "";
  @Input() executionTitle: string = "";
  empInfo: any;
  PUInfo: any;
  ex: Array<Execution> = new Array();
  ex1:Execution = new Execution();
  imgs: Array<Banner> = new Array();
  constructor(private stateService: StatemanagementService, private execService: ExecutionService) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredEmployee();
    this.PUInfo = this.stateService.getStoredProject();
    let adm: any;
    adm = this.stateService.getStoredADM();
    if (adm) {
      this.PUInfo = this.stateService.getStoredSelectedProject();
    }
    this.getEx();
  }

  getEx() {
    this.execService.getEx(this.empInfo.UserCode, this.PUInfo.ProjectCode, this.step).subscribe(res => {
      if (res.length > 0) {
        this.ex1 = res[res.length-1];
      }
      
      // this.ex = res;
      // if (res.length > 0) {
      //   this.ex.forEach((val, idx) => {
      //     let bans: Banner = new Banner();
      //     bans.BannerDesc = val.Description;
      //     bans.BannerPath = globalVar.storagePhoto + val.Filename;
      //     this.imgs.push(bans);
      //   })
      // }
    });
  }
}
