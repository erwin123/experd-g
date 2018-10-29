import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Solution } from '../model';
import * as globalVar from '../global';  

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private url = globalVar.global_trx + '/sl';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  getSolution(userCode:string, documentCode:string):Observable<Solution>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Solution>(this.url + '/cr', { UserCode: userCode, DocumentCode:documentCode }, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getSolutionActionOrder(userCode:string, actionOrder:string):Observable<Solution>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Solution[]>(this.url + '/cr', { UserCode: userCode, ActioNOrder:actionOrder }, { headers: headers })
      .map(res => {
        if (res) {
          return res[res.length-1];
        }
        throw new Error('Not Found');
      });
  }

  getSolutionUser(userCode:string):Observable<Solution[]>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post<Solution[]>(this.url + '/cr', { UserCode: userCode }, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postSolution(solution:Solution):Observable<Solution>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    
    return this.httpClient.post<Solution>(this.url, solution, { headers: headers })
    .map(res => {
      if (res[0]) {
        return res[0];
      }
      throw new Error('Not Found');
    });
  }

  putSolution(solution:Solution){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.put(this.url+"/"+solution.DocumentCode, solution, { headers: headers })
    .map(res => {
      if (res) {
        return res;
      }
      throw new Error('Not Found');
    });
  }

}
