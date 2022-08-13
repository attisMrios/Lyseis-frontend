import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import BaseService from 'src/app/utils/base.service';
import { CookieStorageService } from 'src/app/utils/cookie-storage.service';
import { MessagesService } from 'src/app/utils/messages.service';
import { Ly6Response, Ly6Request } from 'src/app/types';
import ProductsModel from './products.model';
import { Router } from '@angular/router';
import { GenericCrudService } from '../../common/generic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends GenericCrudService {
  
  constructor(public http: HttpClient, 
    public cookies: CookieStorageService,
    public messages: MessagesService,
    public router: Router) {
      super(http, cookies, messages, router);
    }

    UploadPicture(form: FormData): Observable<void> {
      return this.ConsumeService('api/files/productimage', 'post', form, 'multipart/form-data')
    }

}
