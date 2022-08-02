import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdPartyCapturePageRoutingModule } from './third-party-capture-routing.module';

import { ThirdPartyCapturePage } from './third-party-capture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdPartyCapturePageRoutingModule
  ],
  declarations: [ThirdPartyCapturePage]
})
export class ThirdPartyCapturePageModule {}
