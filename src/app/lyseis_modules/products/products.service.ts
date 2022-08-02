import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import BaseService from 'src/app/utils/base.service';
import { CookieStorageService } from 'src/app/utils/cookie-storage.service';
import { MessagesService } from 'src/app/utils/messages.service';
import { Ly6Response, Ly6Services as Ly6Request } from 'src/types';
import ProductsModel from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  
  constructor(public http: HttpClient, 
              public cookies: CookieStorageService,
              public messages: MessagesService) {
    super(http, cookies, messages);
  }

  Read(): Observable<any> {
    return new Observable(observer => {

        const serverEvents = new EventSource("http://localhost:3000/api/generic/read?process=products");

        serverEvents.onmessage = function (event) {
            observer.next(JSON.parse(event.data));
        }
    })
  }

  Create(data: Ly6Request<ProductsModel>): Observable<any> {
    return this.ConsumeService('api/generic/create', 'post', data)
  }

  Update(data: Ly6Request<ProductsModel>) {
    return this.ConsumeService(`api/generic/update`, 'put', data);
  }

  Delete(id: number): Observable<Ly6Response<void>> {
    return this.ConsumeService(`api/generic/delete?process=products&id=${id}`, 'delete')
  }

  SearchByCode(code: any): Observable<Ly6Response<Array<ProductsModel>>> {
    return this.ConsumeService('api/generic/searchbyfield', 'post', {process: 'products', data: `code='${code}'`})
  }
}
