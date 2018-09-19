import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { StatemanagementService } from './statemanagement.service';

@Injectable({
  providedIn: 'root'
})
export class PushnotifService {
  private url = globalVar.global_trx + '/push';  // URL to web api
  constructor(private httpClient: HttpClient, private stateService:StatemanagementService) { }

  addPushSubscriber(obj: any, userCode:string): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    let myurl = globalVar.global_trx
    return this.httpClient.post(myurl +'/pushsubscribe/'+userCode, obj, { headers: headers })
      .map(
        res => {
          return res;
        }
      );
  }

  getPushNotif(userCode: string): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);

    return this.httpClient.post<any>(this.url + '/cr', { UserCode: userCode, IsActive: 1 }, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  pushNotifMessage(message:string, userCode:string): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);
    let myurl = globalVar.global_trx
    return this.httpClient.post<any>(myurl + '/pushnotif/'+userCode, { message: message }, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  deleteNotif(userCode:string):Observable<any>{
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);

    return this.httpClient.delete(this.url +'/'+ userCode, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }
}
