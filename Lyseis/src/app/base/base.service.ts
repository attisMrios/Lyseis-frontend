import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Utils from '../utils/utils';

export default class BaseService {

    constructor(public http: HttpClient) {

    }

    public ConsumeService(endpoint: string, verb: 'POST' | 'GET' | 'PUT' | 'DELETE', body?: unknown, contentType: 'application/json' | 'application/x-www-form-urlencoded' = 'application/json', headers?: HttpHeaders): Observable<any> {
        return new Observable(observer => {

            let defaultHeaders = this.SetDefaultHeaders();

            if (!headers) {
                headers = defaultHeaders;
            } else {

                // concat all headers
                let headerValue = '';
                headers.keys().forEach(headerKey => {
                    headerValue = headers?.get(headerKey) as string;
                    defaultHeaders[headerKey] = headerValue;
                });
            }

            defaultHeaders['Content-Type'] = contentType;

            switch (verb) {
                case 'POST':
                    this.http.post(`${environment.baseUrl}/${endpoint}`, body, { headers: defaultHeaders })
                    .subscribe({
                        next: response => {
                            observer.next(response);
                        },
                        error: error => {
                            observer.error(error);
                        }
                    })
                    break;

                case 'GET':
                    let params: HttpParams = body as HttpParams;
                    this.http.get(`${environment.baseUrl}${endpoint}`, { headers: defaultHeaders, params: params })
                        .subscribe({
                            next: response => {
                                observer.next(response);
                            },
                            error: error => {
                                observer.error(error)
                            }
                        });

                    break;
            }
        });
    }
    SetDefaultHeaders(): any {
        let headers: any = {};
        let token = Utils.GetSessionStorage('token');
        if (token != '' || token == null) {
            headers['Authorization'] = `bearer ${token}`;
        }

        return headers;
    }
}