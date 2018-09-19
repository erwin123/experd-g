import { Component, OnInit } from '@angular/core';
import { Draweritems } from '../model';
import { InitialDataService } from '../services/initial-data.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  items:Draweritems[];
  constructor(private initialDataService:InitialDataService, private _scrollToService: ScrollToService) { }

  ngOnInit() {
    this.initialDataService.getJSON("drawer.json").subscribe(res =>{
      this.items = res;
    });
  }

  triggerScrollTo(target) {
    console.log(target);
    const config: ScrollToConfigOptions = {
      target: target
    };
 
    this._scrollToService.scrollTo(config);
  }
}

