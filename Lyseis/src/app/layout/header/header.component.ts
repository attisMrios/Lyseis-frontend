import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'src/app/libs/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  Logout() {
    Utils.CleanSessionStorage();
    this.router.navigate(['/login']);
  }


}
