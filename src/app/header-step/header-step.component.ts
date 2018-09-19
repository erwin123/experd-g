import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-step',
  templateUrl: './header-step.component.html',
  styleUrls: ['./header-step.component.css']
})
export class HeaderStepComponent implements OnInit {

  @Input() backTo:string="";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(){
    this.router.navigate(['/main/'+this.backTo]);
  }
}
