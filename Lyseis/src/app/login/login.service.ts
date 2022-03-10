import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ResponseModel from '../base/response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(public override http: HttpClient) {
    super(http);
  }

  public GetToken(): Observable<ResponseModel<{token:string, expirationDate: Date}>> {
    return this.ConsumeService('/api/authentication/token', 'GET', null, 'application/x-www-form-urlencoded');
  }

  
}
