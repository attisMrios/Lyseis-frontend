import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import Utils from '../libs/utils';
export default class BaseService {

    constructor(public http: HttpClient) {

    }
    
    public ConsumeService(endpoint: string, verb: 'POST'|'GET'|'PUT'|'DELETE', body: unknown, contentType: 'application/json'|'application/x-www-form-urlencoded' = 'application/json', headers?: HttpHeaders): Observable<any> {
        return new Observable(observer => {
            if(!headers){
                headers = this.SetDefaultHeaders();
            }

            headers?.append('Content-Type', contentType);
            switch (verb) {
                case 'POST':
                    this.http.post(`${environment.baseUrl}/${endpoint}`, body, {headers: headers}).subscribe(response => {
                        observer.next(response)
                    })
                    break;

                case 'GET':
                    this.http.get(`${environment.baseUrl}/${endpoint}`).subscribe(response => {
                        observer.next(response);
                    })
                    break;
            }
        });
    }
    SetDefaultHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.append('Authorization', `bearer ${Utils.GetSessionStorage('token')}`);

        return headers;
    }
}