import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ly6ContentTypes, Ly6Methods } from 'src/app/types';
import { CookieStorageService } from './cookie-storage.service';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
export default class BaseService {

    constructor(public http: HttpClient,
                public cookies: CookieStorageService,
                public messages: MessagesService,
                public router: Router) {

    }
    protected ConsumeService(end_point: string, method: Ly6Methods, data?: any, content_type: Ly6ContentTypes = 'application/json'): Observable<any> {
        return new Observable(observer => {
            const headers = {};
        let observable: any;
        try {
            headers['Authorization'] = `Bearer ${this.cookies.GetCookie('token')}`;
            headers['Conten-Type'] = content_type;

            end_point = `${environment.lyseis.base_url}/${end_point}`;
            switch (method) {
                case 'post':
                    this.http.post(end_point, data, { headers: headers }).subscribe(
                        response => {
                            observer.next(response);
                        },
                        error => {
                            if(error.status == 403) {
                                // debe borrar cookies
                                this.cookies.ClearCookie('access_token')
                                // debe redireccionar al login
                                this.router.navigate['/']
                            }
                            observer.error(error);
                        }
                    )
                    break;

                case 'get':
                    this.http.get(end_point, { headers: headers }).subscribe(
                        response => {
                            observer.next(response);
                        },
                        error => {
                            if(error.status == 403) {
                                // debe borrar cookies
                                this.cookies.ClearCookie('access_token')
                                // debe redireccionar al login
                                this.router.navigate['/']
                            }
                            observer.error(error);
                        }
                    )
                    break;

                case 'delete':
                    this.http.delete(end_point, { headers: headers }).subscribe(
                        response => {
                            observer.next(response);
                        },
                        error => {
                            if(error.status == 403) {
                                // debe borrar cookies
                                this.cookies.ClearCookie('access_token')
                                // debe redireccionar al login
                                this.router.navigate['/']
                            }
                            observer.error(error);
                        }
                    )
                    break;

                case 'put':
                    this.http.put(end_point, data, { headers: headers }).subscribe(
                        response => {
                            observer.next(response);
                        },
                        error => {
                            if(error.status == 403) {
                                // debe borrar cookies
                                this.cookies.ClearCookie('access_token')
                                // debe redireccionar al login
                                this.router.navigate['/']
                            }
                            observer.error(error);
                        }
                    )
                    break;
            }
        } catch (error) {
            this.messages.ShowToast(error.message)
        }

        return observable;
        })
    }
}