import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { Cnc } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CncService {
  private url = globalVar.global_trx + '/cn';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  getCnc(coachCode: string, projectCode: string): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url + '/cr', { CoachCode: coachCode, ProjectCode: projectCode }, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }


  getCncCurrent(userCode: string, projectCode: string): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url + '/cr', { userCode: userCode, ProjectCode: projectCode }, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  putCnc(objCnc:Cnc){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.put(this.url+"/"+objCnc.Id, objCnc, { headers: headers })
    .map(res => {
      if (res) {
        return res;
      }
      throw new Error('Not Found');
    });
  }
}
