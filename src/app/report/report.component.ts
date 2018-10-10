import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Project } from '../model';
import { StatemanagementService } from '../services/statemanagement.service';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  projectSelected: Project = new Project();
  rawData:any;
  coach:string="";
  project:string="";
  empInfo:any;
  projects:any;
  selects:Array<any>=new Array<any>();
  selectPr:Array<any>=new Array<any>();
  pageOn:boolean = false;
  
  constructor(private rptService:ReportService, private stateService:StatemanagementService, private excelService:ExcelService) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredADM();
    this.projectSelected = this.stateService.getStoredSelectedProject();
    this.projects = this.stateService.getStoredListProject();

    this.selects.push({value:this.empInfo.UserCode, text:"Under Me"});
    this.selects.push({value:"", text:"All"});

    this.selectPr = this.projects;
    this.project = this.projects[0].ProjectCode;
    this.getReport(this.project, this.coach);
  }

  getReport(projectCode:string, coachCode:string){
    this.rptService.getReport(projectCode, coachCode).subscribe(res =>{
      this.rawData = res;
    });
  }

  onCoachChange(e:string){
    this.rawData = null;
    this.getReport(this.project,e);
  }

  onProjectChange(e:string){
    this.rawData = null;
    this.getReport(e, this.coach);
  }

  exportData(){
    this.excelService.exportAsExcelFile(this.rawData,"export_raw");
  }
}
