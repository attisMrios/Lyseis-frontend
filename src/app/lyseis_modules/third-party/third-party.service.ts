import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseService from 'src/app/utils/base.service';
import { CookieStorageService } from 'src/app/utils/cookie-storage.service';
import { MessagesService } from 'src/app/utils/messages.service';
import { Ly6Process, Ly6Response, Ly6Services as Ly6Request } from 'src/app/types';
import ThirdPartyModel from './third-party.model';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService extends BaseService {

  constructor(public http: HttpClient,
    public cookies: CookieStorageService,
    public messages: MessagesService) {
    super(http, cookies, messages);
  }

  Read(process: Ly6Process): Observable<any> {
    return new Observable(observer => {
      const serverEvents = new EventSource(`http://localhost:3000/api/generic/read?process=${process}`);

      serverEvents.onmessage = function (event) {
        observer.next(JSON.parse(event.data));
      }
    })
  }

  Create(data: Ly6Request<ThirdPartyModel>): Observable<Ly6Response<Array<ThirdPartyModel>>> {
    return this.ConsumeService('api/generic/create', 'post', data)
  }

  Update(data: Ly6Request<ThirdPartyModel>): Observable<Ly6Response<Array<ThirdPartyModel>>> {
    return this.ConsumeService(`api/generic/update`, 'put', data);
  }

  Delete(id: number, process: Ly6Process): Observable<Ly6Response<Array<ThirdPartyModel>>> {
    return this.ConsumeService(`api/generic/delete?process=${process}&id=${id}`, 'delete')
  }

  SearchByCode(data: string, process: Ly6Process): Observable<Ly6Response<Array<ThirdPartyModel>>> {
    return this.ConsumeService('api/generic/searchbyfield', 'post', { process: process, data: data })
  }
}
