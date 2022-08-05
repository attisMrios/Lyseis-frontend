import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ly6Response } from 'src/app/types';
import BaseService from 'src/app/utils/base.service';
import { CookieStorageService } from 'src/app/utils/cookie-storage.service';
import { MessagesService } from 'src/app/utils/messages.service';
import MenuModel from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService {

  constructor(public http: HttpClient,
              public cookies: CookieStorageService,
              public messages: MessagesService,
              public router: Router) {
    super(http, cookies, messages, router);
  }

  GetMenu(condition: string): Observable<Ly6Response<Array<MenuModel>>> {
    return this.ConsumeService(`api/admin/menu?condition=${condition}`, 'get');
  }
}
