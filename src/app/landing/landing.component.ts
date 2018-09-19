import { Component, OnInit } from '@angular/core';
import { Draweritems } from '../model';
import { Banner } from '../model';
import { InitialDataService } from '../services/initial-data.service';
import { SwPush } from '@angular/service-worker';
import { PushnotifService } from '../services/pushnotif.service';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  items: Draweritems[];
  banners: Banner[];
  opened: boolean = false;
  empInfo: any;
  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

  constructor(private swPush: SwPush, private initialDataService: InitialDataService,
    private pushService: PushnotifService, private stateService: StatemanagementService) { }

  ngOnInit() {
    this.initialDataService.getJSON("drawer.json").subscribe(res => {
      this.items = res;
    });
    this.initialDataService.getJSON("banner.json").subscribe(res => {
      this.banners = res;
    });

    this.empInfo = this.stateService.getStoredEmployee();
    if (this.empInfo) {
      this.pushService.getPushNotif(this.empInfo.UserCode).subscribe(res => {
        if (res.length === 0) {
          setTimeout(() => {
            this.opened = true;
          }, 3000);
        } else {
          this.pushService.deleteNotif(this.empInfo.UserCode).subscribe(d => {
            this.okPermission();
          });

        }
      }, err => {
        this.stateService.redirectLogin();
      })
    } else if (this.stateService.getStoredADM()) {

      this.empInfo = this.stateService.getStoredADM();
      this.pushService.getPushNotif(this.empInfo.UserCode).subscribe(res => {
        if (res.length === 0) {
          setTimeout(() => {
            this.opened = true;
          }, 3000);
        } else {
          this.pushService.deleteNotif(this.empInfo.UserCode).subscribe(d => {
            this.okPermission();
          });
        }
      }, err => {
        this.stateService.redirectLogin();
      })
    }
  }

  okPermission() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log(sub);
        this.pushService.addPushSubscriber(sub, this.empInfo.UserCode).subscribe()
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
    this.opened = false;
  }
}
