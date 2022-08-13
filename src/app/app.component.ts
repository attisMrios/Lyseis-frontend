import { Component, OnInit } from '@angular/core';
import { LoginService } from './lyseis_modules/common/login.service';
import MenuModel from './lyseis_modules/common/menu.model';
import { MenuService } from './lyseis_modules/common/menu.service';
import { Ly6Response } from './types';
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

  private current_parent_id: number = 0;
  private previous_menu: MenuModel;
  public navigation_menu: Array<MenuModel> = [{
    icon: 'home',
    id: 0,
    order: 0,
    parent_id: 0,
    title: 'Back',
    url: '/home'
  }];

  public mainMenu: Array<MenuModel> = [];


  // { title: 'Home', url: '/home', icon: 'home' },
  // { title: 'Documents', url: '/documents', icon: 'bag-handle' },
  // { title: 'Inventories', url: '/inventories', icon: 'cube' },
  // { title: 'Products', url: '/products', icon: 'cube' },
  // { title: 'Third party', url: '/third-party', icon: 'id-card' },
  // { title: 'Control panel', url: '/control-panel', icon: 'options' }

  public loadLayout = false;
  public appPages = this.mainMenu

  constructor(private cookies: CookieStorageService,
    private loginService: LoginService,
    public messages: MessagesService,
    private menu: MenuService) {
    AppComponent._instance = this;
  }

  ngOnInit(): void {
    if (this.cookies.GetCookie('access_token') != '') {
      this.loadLayout = true;
      this.GetMenu();
    }
  }

  login(user_name: string | number, password: string | number) {
    this.loginService.Login(user_name.toString(), password.toString()).subscribe(
      data => {
        this.messages.ShowToast("welcome");
        document.cookie = `access_token=${data.token}`;
        this.loadLayout = true;

        // load menu
        this.GetMenu();
      },
      error => {
        this.messages.ShowToast(error.error);
      }
    )
  }

  GetMenu() {
    const service = this.menu.GetMenu('parent_id = 0').subscribe(
      (response: Ly6Response<Array<MenuModel>>) => {
        this.appPages = response.data;
        service.unsubscribe();
      },
      error => {
        console.log(error);
        this.messages.ShowAlert('Impossible to load menu')
        service.unsubscribe();
      }
    )
  }

  LoadMenu({ ...menu }: MenuModel) {
    try {
      if (menu.title != 'Home') {
        if (menu.title == 'Back') {
          this.navigation_menu.pop();
          menu = this.navigation_menu[this.navigation_menu.length - 1]
        } else {
          menu.title = 'Back';
          this.navigation_menu.push(menu);
        }
        const service = this.menu.GetMenu(`parent_id = ${menu.id}`).subscribe(
          (response: Ly6Response<Array<MenuModel>>) => {
            if (response.data.length > 0) {
              this.appPages = response.data;
              if (this.navigation_menu.length > 1) {
                this.appPages.push(this.navigation_menu[this.navigation_menu.length - 2])
              }
            } else {
              this.navigation_menu.pop()
            }

            service.unsubscribe();
          },
          error => {
            console.log(error);
            this.messages.ShowAlert('Impossible to load menu');
            service.unsubscribe();
          }
        )
      }
    } catch (error) {
      console.log(error);
      
    }

  }
}

