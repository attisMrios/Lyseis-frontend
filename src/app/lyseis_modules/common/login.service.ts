import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import BaseService from 'src/app/utils/base.service';
import { CookieStorageService } from 'src/app/utils/cookie-storage.service';
import { MessagesService } from 'src/app/utils/messages.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(public http: HttpClient,
              public cookies: CookieStorageService,
              public messages: MessagesService,
              public router: Router) {
    super(http, cookies, messages, router);
  }

  Login(user_name: string, password: string): Observable<any> {
    return this.ConsumeService('api/token', 'post', {user: user_name, password: password});
  }
}
