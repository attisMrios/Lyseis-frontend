import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { CookieStorageService } from './utils/cookie-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecureService {
  
  constructor(private cookies: CookieStorageService) { }

  isLoggedIn(): Observable<boolean> {
    let token = this.cookies.GetCookie('access_token')!='';
    if(!token){
      AppComponent.Instance.loadLayout = false;
    }
    return of(token)
  }
}
