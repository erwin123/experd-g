import { Component, OnInit } from '@angular/core';
import { StatemanagementService }  from '../services/statemanagement.service'
import { Project } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectboard',
  templateUrl: './projectboard.component.html',
  styleUrls: ['./projectboard.component.css']
})
export class ProjectboardComponent implements OnInit {

  projectList:Array<Project> = new Array();
  projectSelected:Project = new Project();

  constructor(private router: Router, private stateService:StatemanagementService) { }

  ngOnInit() {
    this.projectList = this.stateService.getStoredListProject();
  }

  onClick(projectCode:string){
    this.projectSelected = this.projectList.find(f => f.ProjectCode === projectCode);
    localStorage.setItem('projectSelected', JSON.stringify(this.projectSelected));
    this.stateService.setProjectSelected(true);
    this.router.navigate(['/main/coachy']);
  }

}
