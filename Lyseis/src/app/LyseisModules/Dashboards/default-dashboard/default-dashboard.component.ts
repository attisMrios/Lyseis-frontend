import { Component, OnInit } from '@angular/core';
import { faTh, faCheck, faTrash, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.sass']
})
export class DefaultDashboardComponent implements OnInit {

  heading = 'Lyseis Dashboard';
  subheading = '';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  ngOnInit() {
  }

}
