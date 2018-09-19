import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Project } from '../model';
import * as globalVar from '../global';  

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = globalVar.global_trx + '/pu';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) {
  }

  getProject():Observable<Project[]>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let myurl = globalVar.global_trx + '/pj';
    return this.httpClient.get<Project[]>(myurl, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getProjectUser(userCode:string):Observable<any>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<any>(this.url + '/cr', { UserCode: userCode }, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }
}
