import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global'; 
import {User } from '../model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = globalVar.global_trx + '/us';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;

  constructor(private httpClient: HttpClient) { }
  getUser(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post(this.url + '/cr', { username: this.token.username }, { headers: headers })
      .map(res => {
        if(res[0])
        {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getCoach(): Observable<User[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post<User[]>(this.url + '/cr', { RoleCode: 'RL000002' }, { headers: headers })
      .map(res => {
        if(res.length > 0)
        {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getUserAll(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.get(this.url, { headers: headers })
      .map(res => {
        if(res)
        {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  getUserCode(userCode:string): Observable<User> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post(this.url + '/cr', { UserCode: userCode }, { headers: headers })
      .map(res => {
        if(res[0])
        {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getUserMail(email:string): Observable<User> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post<User>(this.url + '/cr', { Email: email }, { headers: headers })
      .map(res => {
        if(res[0])
        {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }
}
