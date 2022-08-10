import { Component, Input, OnInit } from '@angular/core';
import ThirdPartyModel from '../third-party.model';
import { Ly6CrudActions, Ly6Response } from '../../../../types'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Globals from 'src/app/utils/globals';
import { MessagesService } from 'src/app/utils/messages.service';
import { ThirdPartyService } from '../third-party.service';

@Component({
  selector: 'app-third-party-capture',
  templateUrl: './third-party-capture.page.html',
  styleUrls: ['./third-party-capture.page.scss'],
})
export class ThirdPartyCapturePage implements OnInit {

  @Input() product: ThirdPartyModel;
  @Input() action: Ly6CrudActions;

  page_title: string = '';
  form: FormGroup;
  product_picture: any

  constructor(
    private form_builder: FormBuilder,
    private messages: MessagesService,
    private thirdPartyService: ThirdPartyService,
    private modalCtrl: ModalController) {

    this.form = this.form_builder.group({
      id: [0, [Validators.required]],
      identification: [null, [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      address: [''],
      e_mail: [''],
      phone: [''],
      picture_path: ['pending']
    })
  }

  ngOnInit() {
    this.page_title = (this.action == 'create') ? 'Creating third party' : (this.action == 'update') ? 'Updating third party' : 'Third party';
    if (this.action == 'update') {
      this.form.patchValue(this.product);
    }
  }

  Save() {
    try {

      if (this.form.valid) {
        let file: File;
        let picture_name: string;
        if (this.form.controls.picture_path != null) {
          file = this.form.controls.picture_path.value;
          picture_name = `${this.form.controls.identification.value}.${file.name.split('.')[1]}`
          this.form.controls.picture_path.patchValue(picture_name)
        }
        if (this.action == 'create') {
          this.thirdPartyService.Create({ process: 'third_party', data: this.form.value }).subscribe(
            (response: Ly6Response<Array<ThirdPartyModel>>) => {
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
        } else if (this.action == 'update') {
          this.thirdPartyService.Update({ process: 'third_party', data: this.form.value }).subscribe(
            (response: Ly6Response<Array<ThirdPartyModel>>) => {
              this.messages.ShowToast(response.message)
              if(file != null){
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
      this.thirdPartyService.UploadPicture(formData).subscribe(
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

    try {

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
    } catch (error) {
      this.messages.ShowToast(error.message);
    }

  }

  /**
   * before save, must check the third party identification if exist
   */
  VerifyCode() {
    try {
      this.thirdPartyService.SearchByCode(`identification = ${this.form.controls['identification'].value}`, 'third_party').subscribe(response => {
        if (response.data.length > 0) {
          this.messages.ShowToast(`The third party with identification ${this.form.controls['identification'].value} alredy exist, you must set a different identification`);
          this.form.controls['identification'].patchValue('');
        }
      })
    } catch (error) {
      this.messages.ShowToast(error.error);
    }
  }

  /**
   * default image when error ocurred on picture box
   * @param element 
   */
  ErrorImage(element: any) {
    element.target.src = Globals.DEFAULT_PICTURE
  }

  /**
   * close modal
   */
  Cancel() {
    this.form.reset();
    this.modalCtrl.dismiss();
  }

}
