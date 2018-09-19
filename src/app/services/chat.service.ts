import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';  
import {Chat} from '../model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = globalVar.global_trx + '/ch';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) { }

  getChat(ownerCode: string, docType: string): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url + '/cr', { OwnerCode: ownerCode, DocumentType:docType }, { headers: headers })
      .map(res => {
        if (res) {
          return res;
        }
        throw new Error('Not Found');
      });
  }

  postChat(chat: Chat): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);

    return this.httpClient.post(this.url, chat, { headers: headers })
      .map(res => {
        if (res[0]) {
          return res[0];
        }
        throw new Error('Not Found');
      });
  }
}
