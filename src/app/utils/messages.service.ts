import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  constructor(public toastController: ToastController, private alert: AlertController) { }

  async ShowToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async ShowAlert(message: string) {
    await this.alert.create({
      header: 'Alert',
      subHeader: '',
      message: message,
      buttons: ['OK']
    })
  }
}
