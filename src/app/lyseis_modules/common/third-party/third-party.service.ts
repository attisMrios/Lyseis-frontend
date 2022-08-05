import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseService from 'src/app/utils/base.service';
import { CookieStorageService } from 'src/app/utils/cookie-storage.service';
import { MessagesService } from 'src/app/utils/messages.service';
import { Ly6Process, Ly6Response, Ly6Request } from 'src/app/types';
import ThirdPartyModel from './third-party.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService extends BaseService {

  constructor(public http: HttpClient,
    public cookies: CookieStorageService,
    public messages: MessagesService,
    public router: Router) {
    super(http, cookies, messages, router);
  }

  Read(process: Ly6Process): Observable<any> {
    return new Observable(observer => {
      const serverEvents = new EventSource(`http://localhost:3000/api/generic/read?process=${process}`);

      serverEvents.onmessage = function (event) {
        observer.next(JSON.parse(event.data));
      }
    })
  }

  Create<T>(data: Ly6Request<ThirdPartyModel>): Observable<Ly6Response<Array<T>>> {
    return this.ConsumeService('api/generic/create', 'post', data)
  }

  Update<T>(data: Ly6Request<ThirdPartyModel>): Observable<Ly6Response<Array<T>>> {
    return this.ConsumeService(`api/generic/update`, 'put', data);
  }

  Delete<T>(id: number, process: Ly6Process): Observable<Ly6Response<Array<T>>> {
    return this.ConsumeService(`api/generic/delete?process=${process}&id=${id}`, 'delete')
  }

  SearchByCode<T>(data: string, process: Ly6Process): Observable<Ly6Response<Array<T>>> {
    return this.ConsumeService('api/generic/searchbyfield', 'post', { process: process, data: data })
  }
}
