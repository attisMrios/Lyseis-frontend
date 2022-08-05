import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MessagesService } from 'src/app/utils/messages.service';
import { ThirdPartyCapturePage } from './third-party-capture/third-party-capture.page';
import ThirdPartyModel from './third-party.model';
import { ThirdPartyService } from './third-party.service';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.page.html',
  styleUrls: ['./third-party.page.scss'],
})
export class ThirdPartyPage implements OnInit {

  thirdPartyDataSource: Array<ThirdPartyModel> = [];
  thirdPartySelectedList: Array<ThirdPartyModel>

  constructor(private thirdPartyService: ThirdPartyService,
              private messages: MessagesService,
              private modalCtrl: ModalController,
              public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    try {
      this.thirdPartyService.Read('third_party').subscribe(data => {
        this.thirdPartyDataSource = data;
      })
    } catch (error: any) {
      console.log(error);
      this.messages.ShowAlert(error.message);
    }
  }

  /**
   * open crud modal for update or create data
   * @param action crud action may set create or update
   */
   OpenCrudModal(product: ThirdPartyModel = null) {
    if (product) {
        this.openModal(product);
    } else {
      this.openModal();
    }
  }

  /**
   * open crud modal for update or create data
   * @param action crud action may set create or update
   */
  async openModal(product: ThirdPartyModel = null) {

    const modal = await this.modalCtrl.create({
      component: ThirdPartyCapturePage,
      swipeToClose: true,
      componentProps: {
        product: (product) ? product : null,
        action: (product) ? 'update' : 'create'
      },
      cssClass: 'ly6-modal'
    });
    modal.present();
  }

  /**
   * delete products array
   * @param selectedProducts products list to delete
   */
  delete(selectedProducts: Array<ThirdPartyModel>) {
    this.thirdPartySelectedList = selectedProducts
    this.presentActionSheet()
  }

  /**
   * is used for delete data
   */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete category',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          if (this.thirdPartySelectedList.length > 0) {
            this.thirdPartySelectedList.forEach(item => {
              this.thirdPartyService.Delete(item.id, 'third_party').subscribe(
                response => {
                  this.messages.ShowToast(response.message)
                },
                error => {
                  this.messages.ShowToast(error.message)
                }
              )
            })
          } else {
            this.messages.ShowToast("Please select an item to delete");
          }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    await actionSheet.onDidDismiss();
  }

}
