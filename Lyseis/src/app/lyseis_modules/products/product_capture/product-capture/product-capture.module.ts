import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCapturePageRoutingModule } from './product-capture-routing.module';

import { ProductCapturePage } from './product-capture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCapturePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductCapturePage]
})
export class ProductCapturePageModule {}
