import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { Email } from '../model';
import { UserService } from './user.service';
import { PushnotifService } from './pushnotif.service';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class MailerService {
  private url = globalVar.global_trx + '/mailer';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";
  constructor(private swPush: SwPush, private httpClient: HttpClient, private userService: UserService, private pushService: PushnotifService) { }

  sendMail(mail: Email): Observable<any> {
    let user: any;
    this.userService.getUserMail(mail.MessageTo).subscribe(res => {
      user = res;
      this.pushService.pushNotifMessage(mail.MessageSubject, user.UserCode).subscribe();

    }, err => {
      console.log("failed to notif, try to subscribe again.");
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.pushService.addPushSubscriber(sub, user.UserCode).subscribe()
        })
        .catch(err => console.error("Could not subscribe to notifications", err));
    })

    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    var footer = "<br/><br/>Jika Anda ingin membalas email ini, silahkan klik di <a href='mailto:" + mail.MessageCc + "?cc=" + mail.MessageTo + "&subject=Re:%20ExperdGuide%20Comment'>sini</a> .<br/>Pesan otomatis dari sistem, <br/> <img src='https://experdg.experd.com/assets/logo-email.png'/>";
    mail.MessageBody += footer;
    return this.httpClient.post(this.url, mail, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }


}
