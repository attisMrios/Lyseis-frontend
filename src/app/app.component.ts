import { Component, OnInit } from '@angular/core';
import { LoginService } from './lyseis_modules/common/login.service';
import { CookieStorageService } from './utils/cookie-storage.service';
import { MessagesService } from './utils/messages.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private static _instance: AppComponent;
  public static get Instance(): AppComponent {
    return this._instance;
  }

  public loadLayout = false;
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Products', url: '/products', icon: 'paper-plane' }
  ];

  constructor(private cookies: CookieStorageService, private loginService: LoginService, public messages: MessagesService) {
    AppComponent._instance = this;
  }

  ngOnInit(): void {
    if (this.cookies.GetCookie('access_token') != '') {
      this.loadLayout = true;
    }
  }

  login(user_name: string, password: string) {
    this.loginService.Login(user_name, password).subscribe(
      data => {
        this.messages.ShowToast("welcome");
        document.cookie = `access_token=${data.token}`;
        this.loadLayout = true;
      },
      error => {
        this.messages.ShowToast(error.error);
      }
    )
  }
}
