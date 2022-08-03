import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdPartyPage } from './third-party.page';
import { DxDataGridModule } from 'devextreme-angular';
import { ThirdPartyCapturePage } from './third-party-capture/third-party-capture.page';
import { ThirdPartyRoutingModule } from './third-party-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThirdPartyRoutingModule,
    IonicModule,
    DxDataGridModule
  ],
  declarations: [ThirdPartyPage, ThirdPartyCapturePage]
})
export class ThirdPartyPageModule {}
