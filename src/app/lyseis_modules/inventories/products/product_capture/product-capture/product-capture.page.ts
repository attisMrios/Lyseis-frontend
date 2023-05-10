import { Component, Input, OnInit } from '@angular/core';
import { Ly6CrudActions, Ly6Response } from 'src/app/types';
import ProductsModel from '../../products.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/utils/messages.service';
import Globals from 'src/app/utils/globals';
import { ProductsService } from '../../products.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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
      code: ['', [Validators.required, Validators.maxLength(20)]],
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
      this.product_picture = `${environment.lyseis.base_url}/uploads/products/${this.form.controls.picture_path.value}`
    }
  }

  Save() {
    try {

      if(this.form.valid){

        let file: File;
        let picture_name: string;
        if (this.form.controls.picture_path != null) {
          file = this.form.controls.picture_path.value;
          picture_name = `${this.form.controls.code.value}.${file.name.split('.')[1]}`
          this.form.controls.picture_path.patchValue(picture_name)
        }

        if(this.action == 'create'){
          this.ProductsService.Create<ProductsModel>({ process: 'products', data: this.form.value }).subscribe(
            (response: Ly6Response<Array<ProductsModel>>) => {
              this.messages.ShowToast(response.message)
              if (file != null) {
                this.UploadFile(file, picture_name);
              }
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
              if (file != null) {
                this.UploadFile(file, picture_name);
              }
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
   * upload service
   */
   UploadFile(file: File, picture_name: string) {
    try {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('name', picture_name);
      this.ProductsService.UploadPicture(formData).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    } catch (error) {
      this.messages.ShowToast(error.message)
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
