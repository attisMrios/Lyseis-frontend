import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonModal, ModalController } from '@ionic/angular';
import { CategoriesService } from './categories.service';

import CategoriesModel from './categories.model';
import { CategoriesCrudModalComponent } from './categories-crud-modal/categories-crud-modal.component';
import { MessagesService } from '../utils/messages.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  name: string = '';
  message: string = '';
  categoryList: Array<CategoriesModel> = [];
  categorySelectedList: Array<CategoriesModel> = [];


  constructor(public messages: MessagesService,
    public categoriesService: CategoriesService,
    public actionSheetController: ActionSheetController,
    private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.categoriesService.read().subscribe(data => {
      console.log(data);
      
      this.categoryList = data.map(file => {
        return {
          id: file.payload.doc.id,
          name: file.payload.doc.data()['name']
        }
      });
    })

    
  }

  checkItem(item: CategoriesModel) {
    let index = this.categorySelectedList.findIndex(m => m.id == item.id);
    // if the category exist, then delete from de list
    if (index >= 0) {
      this.categorySelectedList.splice(index, 1);
    } else {
      this.categorySelectedList.push(item);
    }

  }

}
