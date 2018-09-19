import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Execution } from '../model';
import * as globalVar from '../global';  

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  private url = globalVar.global_trx+"/ex";  // URL to web api
  constructor(private httpClient: HttpClient) { }

  uploadPhoto(fileToUpload: File){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('x-access-token', this.token.token);
    const formData: FormData = new FormData();
    formData.append('exfile', fileToUpload, fileToUpload.name);
    const options: {
      observe: 'events';
      reportProgress: boolean;
      headers: HttpHeaders;
    } = {
      reportProgress: true,
      observe: 'events',
      headers: _headers
    };

    const req = new HttpRequest('POST', this.url + '/upload', formData, options);
    return this.httpClient.request(req).map((event) => { return event });
  }

  postEx(obj:Execution):Observable<any>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url, obj, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }

  getEx(userCode:string, projectCode:string, step:string):Observable<any>{
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url + '/cr', { UserCode: userCode, ProjectCode: projectCode, Step:step }, { headers: headers })
      .map(res => {
        if (res) {
            return res;
        }
        throw new Error('Not Found');
      });
  }
}
