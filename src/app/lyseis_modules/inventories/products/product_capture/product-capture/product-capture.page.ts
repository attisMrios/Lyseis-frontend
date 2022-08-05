import { Component, Input, OnInit } from '@angular/core';
import { Ly6CrudActions, Ly6Response } from 'src/app/types';
import ProductsModel from '../../products.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/utils/messages.service';
import Globals from 'src/app/utils/globals';
import { ProductsService } from '../../products.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-capture',
  templateUrl: './product-capture.page.html',
  styleUrls: ['./product-capture.page.scss'],
})
export class ProductCapturePage implements OnInit {

  @Input() product: ProductsModel;
  @Input() action: Ly6CrudActions;

  page_title: string = '';
  form: FormGroup;
  product_picture: any

  constructor(
    private form_builder: FormBuilder,
    private messages: MessagesService,
    private ProductsService: ProductsService,
    private modalCtrl: ModalController) {
    this.form = this.form_builder.group({
      id: [0, [Validators.required]],
      code: ['', [Validators.required, Validators.maxLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      price: ['', [Validators.required]],
      tax: ['', Validators.required],
      picture_path: ['pending']
    })
  }

  ngOnInit() {
    this.page_title = (this.action == 'create') ? 'Creating product' : (this.action == 'update') ? 'Updating product' : 'Product';
    if(this.action == 'update'){
      this.form.patchValue(this.product);
    }
  }

  Save() {
    try {

      if(this.form.valid){
        if(this.action == 'create'){
          this.ProductsService.Create<ProductsModel>({ process: 'products', data: this.form.value }).subscribe(
            (response: Ly6Response<Array<ProductsModel>>) => {
              this.messages.ShowToast(response.message)
              this.modalCtrl.dismiss();
            },
            error_response => {
              this.messages.ShowToast(error_response.error.message)
              console.log(error_response);
              
            }
          )
        } else if(this.action == 'update') {
          this.ProductsService.Update<ProductsModel>({process: 'products', data: this.form.value}).subscribe(
            (response: Ly6Response<Array<ProductsModel>>) => {
              this.messages.ShowToast(response.message)
              this.modalCtrl.dismiss();
            },
            error_response => {
              console.log(error_response.error.data);
              this.messages.ShowToast(error_response.error.message)
            }
          )
        }
      } else {
        this.messages.ShowToast("please fill out all the fields ")
      }

    } catch (error) {
      this.messages.ShowToast(error.error)
    }
  }

  /**
   * select and save product picture
   * @param event file event
   */
  SelectPicture(event) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.product_picture = reader.result;
      reader.readAsDataURL(file);
    }

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.product_form.get('profile').setValue(file);
      this.form.controls['picture_path'].patchValue(file);
    }
  }

  /**
   * before save, must check the product code if exist
   */
  VerifiCode() {
    try {
      this.ProductsService.SearchByCode<ProductsModel>(` code='${this.form.controls['code'].value}' `, 'products').subscribe(response => {
        if(response.data.length > 0){
          this.messages.ShowToast(`The product with code ${this.form.controls['code'].value} alredy exist, you must set a different code`);
          this.form.controls['code'].patchValue('');
        }
      })
    } catch (error) {
      this.messages.ShowToast(error.error);
    }
  }

  ErrorImage(element: any) {
    element.target.src = Globals.DEFAULT_PICTURE
  }

  Cancel() {
    this.form.reset();
    this.modalCtrl.dismiss();
  }
}
