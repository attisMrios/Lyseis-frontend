import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MessagesService } from 'src/app/utils/messages.service';
import { Ly6CrudActions } from 'src/types';
import ProductsModel from './products.model';
import { ProductsService } from './products.service';
import { ProductCapturePage } from './product_capture/product-capture/product-capture.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productsDataSource: Array<ProductsModel>;
  productsSelectedList: any;

  constructor(private productsService: ProductsService,
    private messages: MessagesService,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,) { }

    /**
     * load products an subscribe to server side events
     */
  ngOnInit() {
    try {
      this.productsService.ReadProducts().subscribe(data => {
        this.productsDataSource = data;
      })
    } catch (error) {
      console.log(error);

    }
  }

  /**
   * open crud modal for update or create data
   * @param action crud action may set create or update
   */
  OpenCrudModal(product: ProductsModel = null) {
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
  async openModal(product: ProductsModel = null) {

    const modal = await this.modalCtrl.create({
      component: ProductCapturePage,
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
  delete(selectedProducts: Array<ProductsModel>) {
    this.productsSelectedList = selectedProducts
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
          if (this.productsSelectedList.length > 0) {
            this.productsSelectedList.forEach(item => {
              this.productsService.Delete(item.id).subscribe(
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
