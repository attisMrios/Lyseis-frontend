import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import BaseService from 'src/app/base/base.service';
import ResponseModel from 'src/app/base/response.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(public http: HttpClient) {
    super(http);
  }

  public GetToken(userName: string, password: string): Observable<ResponseModel<{token:string, expirationDate: Date}>> {
    let params = new HttpParams().set('userName', userName).set('password', password);

    return this.ConsumeService('/api/authentication/token', 'GET', params, 'application/x-www-form-urlencoded');
  }

}
