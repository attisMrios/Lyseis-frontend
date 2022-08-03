import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ly6ContentTypes, Ly6Methods } from 'src/app/types';
import { CookieStorageService } from './cookie-storage.service';
import { MessagesService } from './messages.service';
export default class BaseService {

    constructor(public http: HttpClient, public cookies: CookieStorageService, public messages: MessagesService) {

    }
    protected ConsumeService(end_point: string, method: Ly6Methods, data?: any, content_type: Ly6ContentTypes = 'application/json'): Observable<any> {
        const headers = {};
        let observable: any;
        try {
            headers['Authorization'] = `Bearer ${this.cookies.GetCookie('token')}`;
            headers['Conten-Type'] = content_type;

            end_point = `${environment.lyseis.base_url}/${end_point}`;
            switch (method) {
                case 'post':
                    observable = this.http.post(end_point, data, { headers: headers })
                    break;

                case 'get':
                    observable = this.http.get(end_point, { headers: headers });
                    break;

                case 'delete':
                    observable = this.http.delete(end_point, { headers: headers })
                    break;

                case 'put':
                    observable = this.http.put(end_point, data, { headers: headers })
                    break;
            }
        } catch (error) {
            this.messages.ShowToast(error.message)
        }

        return observable;
    }
}