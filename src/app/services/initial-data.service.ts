import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  constructor(private http: HttpClient) {
    
  }
  public getJSON(filejson:string): Observable<any> {
    return this.http.get("assets/"+filejson);
  }
}
