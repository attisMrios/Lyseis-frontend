import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import Utils from './libs/utils';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{

  title = 'Lyseis';

  constructor(public route: Router) {
    
  }

  ngOnInit(): void {
    let token = Utils.GetSessionStorage('token');
    if(token == ''){
      this.route.navigate(['/login']);
    }
  }

}
