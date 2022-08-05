import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from '../common/menu.service';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.page.html',
  styleUrls: ['./inventories.page.scss'],
})
export class InventoriesPage implements OnInit {

  private menu_id: number;
  constructor() { }


  ngOnInit() {
  }

}
