import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent implements OnInit {
  

  faStar = faStar;
  faPlus = faPlus;

  @Input() heading;
  @Input() subheading;
  @Input() icon;
  @Input() extraIcon;
  @Input() showCreateButton: boolean = false;
  @Input() showExtraButton: boolean = false;
  @Input() createButtonConfig: {name: string};

  @Output() onCreatedClick= new EventEmitter();

  ngOnInit(): void {
      if(this.showCreateButton){
        if(!this.createButtonConfig){
          this.createButtonConfig = {name: 'Crear'};
        }
      }
  }

}
