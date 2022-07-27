import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor() { }

  GetCookie(key: string): string {
    return document.cookie.split(';').find(m =>'nombre').split('=')[1] || '';
  }

  ClearCookie(key: string) {
    document.cookie = `${key}=`;
  }

  AddCookie(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  }
}
