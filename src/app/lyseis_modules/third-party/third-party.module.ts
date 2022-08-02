import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdPartyPageRoutingModule } from './third-party-routing.module';

import { ThirdPartyPage } from './third-party.page';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdPartyPageRoutingModule,
    DxDataGridModule
  ],
  declarations: [ThirdPartyPage]
})
export class ThirdPartyPageModule {}
