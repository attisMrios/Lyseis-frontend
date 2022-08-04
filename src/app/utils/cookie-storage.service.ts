import { Injectable } from '@angular/core';
import { Ly6CookiesTypes } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor() { }

  GetCookie(key: string): string {
    return document.cookie.split(';').find(m =>'nombre').split('=')[1] || '';
  }

  ClearCookie(key: Ly6CookiesTypes) {
    document.cookie = `${key}=`;
  }

  AddCookie(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  }
}
