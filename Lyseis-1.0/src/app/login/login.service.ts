import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import {HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import ResponseModel from '../base/response.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(public override http: HttpClient) {
    super(http);
  }

  public GetToken(userName: string, password: string): Observable<ResponseModel<{token:string, expirationDate: Date}>> {
    let params = new HttpParams().set('userName', userName).set('password', password);

    return this.ConsumeService('/api/authentication/token', 'GET', params, 'application/x-www-form-urlencoded');
  }

}
